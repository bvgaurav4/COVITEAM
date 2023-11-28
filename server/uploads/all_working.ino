#include <SoftwareSerial.h>

//arduino power 5v to breadboard 5v
//arduino power gnd to breadboard gnd

// DISTANCE SENSOR CONNECTIONS AND DEFINITIONS
const int TRIG_PIN = 9; // Arduino pin connected to Ultrasonic Sensor's TRIG pin
const int ECHO_PIN = 10; // Arduino pin connected to Ultrasonic Sensor's ECHO pin
//ultra's gnd to breadboard gnd
//ultra's vcc to breadboard's 5v
// variables for calculating distance:
float duration_us, distance_cm;
const int DISTANCE_THRESHOLD = 10; // centimeters

// FLAME SENSOR CONNECTIONS AND DEFINITIONS
const int FLAME_PIN = 8;  // Arduino pin connected to flame Sensor's DO pin
// flame grd to bb grd
// flame vcc to bb 5v

// SMOKE SENSOR CONNECTIONS AND DEFINITIONS
const int SMOKE_PIN = A0;  // Arduino analog 0 pin connected to Smoke Sensor's A0 pin
// smoke grd to bb grd
// smoke vcc to bb 5v


// LED DEFINITIONS AND CONNECTIONS
const int RLED_PIN  = 6; // Arduino pin6 connected to RED LED's resistor on bb
const int GLED_PIN  =7 ; // Arduino pin7 connected to GREEN LED's resistor on bb
// red and green led shorter side(cathode) connected to bb gnd 
// red and green led longer side(anode) to 220ohms resistor 

// BUZZER CONNECTIONS AND DEFINITIONS
const int buzzerPin = 5; //Define arduino digital 5 pin to buzzer i/o
//buzzer gnd to breadboard gnd
//buzzer vcc to breadboard 5v

// FLOAT SENSOR CONNECTIONS AND DEFINITIONS
const int FLOAT_PIN = 2;
//FLOAT GRD TO BB GRD

// RELAY AND PUMP CONNECTIONS AND DEFINITIONS
const int RELAY_PIN = 3;
// relay - to bb gnd
// relay + to bb 5v



int normal=1; // normal variable which tells if everything in the boat is normal
void setup() {
  Serial.begin (9600);       // initialize serial communication @ 9600 baud;

  pinMode(TRIG_PIN, OUTPUT); // set arduino pin to output mode
  pinMode(ECHO_PIN, INPUT);  // set arduino pin to input mode
  pinMode(RLED_PIN, OUTPUT);  // set arduino pin to output mode
  pinMode(GLED_PIN, OUTPUT);  // set arduino pin to output mode
  pinMode(FLAME_PIN, INPUT); // set arduino pin to input mode
  pinMode(SMOKE_PIN, INPUT); // set arduino pin to input mode
  pinMode(FLOAT_PIN, INPUT_PULLUP); //Arduino Internal Resistor 10K
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.println("MQ2 warming up!");
  delay(3000); // allow the MQ2 to warm up
  Serial.println("MQ2 and all sensors ready!");
}

void loop() {

  int normal=1;
  //wifi module start


  // generate pulse to TRIG pin
  digitalWrite(TRIG_PIN, HIGH);
  digitalWrite(TRIG_PIN, LOW);

  // measure duration of pulse from ECHO pin
  duration_us = pulseIn(ECHO_PIN, HIGH);
  // calculate the distance
  distance_cm = 0.017 * duration_us;
  
  int flame  = digitalRead(FLAME_PIN);// read digital output pin of smoke
  int smoke= analogRead(SMOKE_PIN); // read the sensor on analog A0:

  int water= digitalRead(FLOAT_PIN);
  
  if(distance_cm < DISTANCE_THRESHOLD)
  {  
    Serial.println("CLOSE PROXIMITY!!!");
    Serial.print("distance: ");
    Serial.print(distance_cm);
    Serial.println(" cm");
    normal=0;
  }
  
  
  if (flame || smoke>100)
  {
    Serial.println("smoke value:");
    Serial.println(smoke);
    Serial.println("FIRE!!!");
    normal=0;
    }
  if (water)
  {
    Serial.println("WATER LEAKAGE!!!");
    digitalWrite(RELAY_PIN, HIGH);
    normal=0;
    }
  if(!water)
  { 
    digitalWrite(RELAY_PIN, LOW);// turn off water pump
    }

  if(!normal){
    //digitalWrite(RLED_PIN, HIGH); // turn on LED
    digitalWrite(GLED_PIN, LOW); // turn on LED
    delay(100);
    digitalWrite(GLED_PIN,HIGH);
    digitalWrite(buzzerPin, LOW); //Setting pin to high (This is inverted logic)
      
  }
  else
  {
    //digitalWrite(RLED_PIN, LOW);  // turn off LED
    digitalWrite(GLED_PIN, HIGH); // turn on LED
    Serial.println("EVERYTHING IS NORMAL!!");
    digitalWrite(buzzerPin ,HIGH); //Setting pin to LOW (This is inverted logic)
    
  }
    

  // print the value to Serial Monitor
  

  delay(100);
}
