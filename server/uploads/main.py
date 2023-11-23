
from common import *
from datanode import DataNode
from namenode import NameNode
import tab
import os
import shutil
def process_cmd(cmd, gconf):
    """parse command"""

    cmds = cmd.split()
    flag = False
    if len(cmds) >= 1 and cmds[0] in operation_names:
        if cmds[0] == operation_names[0]:
            if len(cmds) != 2:
                print('Usage: put source_file_path')
            else:
                if not os.path.isfile(cmds[1]):
                    print('Error: input file does not exist')
                else:
                    gconf.file_path = cmds[1]
                    gconf.cmd_type = COMMAND.put
                    flag = True
        elif cmds[0] == operation_names[1]:
            if len(cmds) != 4:
                print('Usage: read file_id offset count')
            else:
                try:
                    gconf.file_id = int(cmds[1])
                    gconf.read_offset = int(cmds[2])
                    gconf.read_count = int(cmds[3])
                except ValueError:
                    print('Error: fileid, offset, count should be integer')
                else:
                    gconf.cmd_type = COMMAND.read
                    flag = True
        elif cmds[0] == operation_names[2]:
            if len(cmds) != 3:
                print('Usage: fetch file_id save_path')
            else:
                gconf.fetch_savepath = cmds[2]
                base = os.path.split(gconf.fetch_savepath)[0]
                if len(base) > 0 and not os.path.exists(base):
                    print('Error: input save_path does not exist')
                else:
                    try:
                        gconf.file_id = int(cmds[1])
                    except ValueError:
                        print('Error: fileid should be integer')
                    else:
                        gconf.cmd_type = COMMAND.fetch
                        flag = True
        elif cmds[0] == operation_names[3]:
            if len(cmds) != 1:
                print('Usage: quit')
            else:
                start_stop_info('Stop')
                print("Bye: Exiting miniDFS...")
                os._exit(0)
                flag = True
                gconf.cmd_type = COMMAND.quit
        elif cmds[0] == operation_names[4]:
            if len(cmds) != 1:
                print('Usage: ls')
            else:
                flag = True
                gconf.cmd_type = COMMAND.ls
        elif cmds[0] == operation_names[5]:
            # put2
            if len(cmds) != 3:
                print('Usage: put2 source_file_path put_savepath')
            else:
                flag = True
                gconf.cmd_type = COMMAND.put2
                gconf.file_path = cmds[1]
                gconf.put_savepath = cmds[2]
        elif cmds[0] == operation_names[6]:
            # read2
            if len(cmds) != 4:
                print('Usage: read2 file_dir offset count')
            else:
                gconf.file_dir = cmds[1]
                try:
                    gconf.read_offset = int(cmds[2])
                    gconf.read_count = int(cmds[3])
                except ValueError:
                    print('Error: offset, count should be integer')
                else:
                    gconf.cmd_type = COMMAND.read2
                    flag = True
        elif cmds[0] == operation_names[7]:
            # fetch2 
            if len(cmds) != 3:
                print('Usage: fetch2 file_dir save_path')
            else:
                gconf.file_dir = cmds[1]
                gconf.fetch_savepath = cmds[2]
                base = os.path.split(gconf.fetch_savepath)[0]
                if len(base) > 0 and not os.path.exists(base):
                    print('Error: input save_path does not exist')
                else:
                    gconf.cmd_type = COMMAND.fetch2
                    flag = True
        elif cmds[0] == operation_names[8]:
            # ls2
            if len(cmds) != 1:
                print('Usage: ls2')
            else:
                flag = True
                gconf.cmd_type = COMMAND.ls2
        elif cmds[0] == operation_names[9]:
            # mkdir
            if len(cmds) != 2:
                print('Usage: mkdir file_dir')
            else:
                gconf.file_dir = cmds[1]
                gconf.cmd_type = COMMAND.mkdir
                flag = True
        elif cmds[0] == operation_names[10]:
            # mkdir
            if len(cmds) != 1:
                print('Usage: meta_chunks')
            else:
                gconf.cmd_type = COMMAND.meta_chunks
                flag = True
        elif cmds[0] == operation_names[11]:
            # mkdir
            if len(cmds) != 1:
                print('Usage: meta_replicas')
            else:
                gconf.cmd_type = COMMAND.meta_replicas
                flag = True
        elif cmds[0] == operation_names[12]:
            gconf.cmd_type = COMMAND.namenode_format
            flag = True
        elif cmds[0] == operation_names[13]:
            gconf.cmd_type = COMMAND.check
            flag = True
        elif cmds[0] == operation_names[14]:
            gconf.cmd_type = COMMAND.recover_chunks
            flag = True 
        elif cmds[0] == operation_names[15]:
            gconf.cmd_type = COMMAND.recover_servers
            flag = True
        elif cmds[0] == operation_names[16]: 
            gconf.cmd_type = COMMAND.rm
            
            gconf.file_id = int(cmds[1])
            flag = True                         
        else:
            pass
    else:
        print('Usage: put|read|fetch|quit|ls|put2|read2|fetch2|ls2|mkdir|meta_chunks|meta_replicas|namenode_format|check|recover_chunks|recover_servers|rm')

    return flag

def run():
    # global config
    gconf = GlobalConfig()

    # make dfs dir
    if not os.path.isdir("dfs"):
        os.makedirs("dfs")
        for i in range(NUM_DATA_SERVER):
            os.makedirs("dfs/datanode%d"%i)
        os.makedirs("dfs/namenode")
    else:
        for i in range(NUM_DATA_SERVER):
            if not os.path.isdir("dfs/datanode%d"%i):
                os.makedirs("dfs/datanode%d"%i)
            if not os.path.isdir("dfs/namenode"):
                os.makedirs("dfs/namenode")

    # start name and data servers
    name_server = NameNode('NameServer', gconf)
    name_server.start()

    data_servers = [DataNode(s_id, gconf) for s_id in range(NUM_DATA_SERVER)]
    for server in data_servers:
        server.start()

    cmd_prompt = 'TEAM 41 > '
    print(cmd_prompt, end='')
    while True:
        cmd_str = input()
        gconf.cmd_flag = process_cmd(cmd_str, gconf)
        if gconf.cmd_flag:
            if gconf.cmd_type == COMMAND.quit:
                sys.exit(0)

            # tell name node to process cmd
            gconf.name_event.set()
            if gconf.cmd_type in [COMMAND.put, COMMAND.put2]:
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].wait()
                if (gconf.file_id==None):
                    print('Put failed! Please check your file path.')
                else:
                    print('Put succeed! File ID is %d' % (gconf.file_id,))
                gconf.server_chunk_map.clear()
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].clear()
            elif gconf.cmd_type == COMMAND.mkdir:
                gconf.mkdir_event.wait()
                gconf.mkdir_event.clear()
            elif gconf.cmd_type in [COMMAND.read, COMMAND.read2]:
                gconf.read_event.wait()
                gconf.read_event.clear()
            elif gconf.cmd_type in [COMMAND.ls, COMMAND.ls2]:
                gconf.ls_event.wait()
                gconf.ls_event.clear()

            elif gconf.cmd_type in [COMMAND.meta_chunks,COMMAND.meta_replicas]:
                gconf.meta_event.wait()
                gconf.meta_event.clear()
            elif gconf.cmd_type in [COMMAND.namenode_format]:
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].wait()
                gconf.server_chunk_map.clear()
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].clear()
            elif gconf.cmd_type in [COMMAND.check]:
                gconf.check_event.wait()
                gconf.check_event.clear()
            elif gconf.cmd_type in [COMMAND.recover_chunks]:
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].wait()
                print("Recovery Finished!")
                gconf.server_chunk_map.clear()
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].clear()
            elif gconf.cmd_type in [COMMAND.recover_servers]:
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].wait()
                print("Recovery Finished!")
                gconf.server_chunk_map.clear()
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].clear()
            elif gconf.cmd_type in [COMMAND.rm]:
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].wait()
                gconf.server_chunk_map.clear()    
                for i in range(NUM_DATA_SERVER):
                    gconf.main_events[i].clear()                            
            elif gconf.cmd_type in [COMMAND.fetch, COMMAND.fetch2]:
                    for i in range(NUM_DATA_SERVER):
                        gconf.main_events[i].wait()

                    if gconf.fetch_chunks > 0:
                        f_fetch = open(gconf.fetch_savepath, mode='wb')
                        for i in range(gconf.fetch_chunks):
                            server_id = gconf.fetch_servers[i]
                            chunk_file_path = "dfs/datanode" + str(server_id) + "/" + str(gconf.file_id) + '-part-' + str(i)
                            chunk_file = open(chunk_file_path, "rb")
                            f_fetch.write(chunk_file.read())
                            chunk_file.close()
                        f_fetch.close()
                        print('Finished download!')

                    for i in range(NUM_DATA_SERVER):
                        gconf.main_events[i].clear()
            else:
                pass
        print(cmd_prompt, end='')


def start_stop_info(operation):
    print(operation, 'NameNode')
    for i in range(NUM_DATA_SERVER):
        print(operation, 'DataNode' + str(i))


if __name__ == '__main__':
    start_stop_info('Start')
    run()
