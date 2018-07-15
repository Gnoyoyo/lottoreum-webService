import serial
import RPi.GPIO as GPIO
import time
import subprocess

def runProcess(command,shell=False):
    import subprocess
    p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=shell)
    return iter(p.stdout.readline, b'')

def convertStrListToFloatList(list_str):
    list_integer = [int(float(i)) for i in list_str ]
    return list_integer

def generateMagicNumber(list_float):
    return 0

def startSerialPort(cmd):
    output = ""
    for line in runProcess(cmd, True):
        output = output + line[:len(line)-1]
    print "get port => "+output
    cmd = '/usr/bin/node ./run.js'
    ser=serial.Serial(output,9600)
    print ser
    print "start reading"
    return ser

def main():
  ser =  startSerialPort( 'ls /dev/ttyACM*')
  while True:
      read_ser=ser.readline()
      print "---------------------------Readed---------------------------"
      if len(read_ser) != 0:
          measure = read_ser.split(";")
          last_str = measure[len(measure)-1]
          last_str = last_str[:len(last_str)-1]
          measure[len(measure)-1] = last_str
          print measure
          cmdconfig = ""
          measure = convertStrListToFloatList(measure)
          cmdconfig = cmd+" "+str(measure[0])+"  "+str(measure[1])
          print cmdconfig
          runProcess(cmdconfig, True)
          print "------------------Sended data to Block----------------------"
      else:
          print "reading..."

main()
