import serial
import RPi.GPIO as GPIO
import time
import subprocess
import time
import datetime

def runProcess(command,shell=False):
    import subprocess
    p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=shell)
    return iter(p.stdout.readline, b'')

def convertStrListToFloatList(list_str):
    list_integer = [float(i) for i in list_str ]
    return list_integer

def generateMagicNumber(list_float):
    if len(list_float) != 6 :
        return str(37),str(15)
    else:
        list_multiply_hundred = [ int(i * 100) for i in list_float]
        temp_product = 1
        for i in list_multiply_hundred[:4]:
             temp_product = temp_product * i
        power_product = list_multiply_hundred[4]*list_multiply_hundred[5]
        return str(temp_product) , str(power_product)

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

def timeStamp():
   return  datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')

def main():
  ser =  startSerialPort( 'ls /dev/ttyACM*')
  cmd = '/usr/bin/node ./run.js'
  while True:
      print "-----------------------Ready---------------------------"
      read_ser=ser.readline()
      print "-------------Readed-["+timeStamp()+"]---------------------------"
      if len(read_ser) != 0:
          measure = read_ser.split(";")
          last_str = measure[len(measure)-1]
          last_str = last_str[:len(last_str)-1]
          measure[len(measure)-1] = last_str
          print measure
          cmdconfig = ""
          measure = convertStrListToFloatList(measure)
          temp,power = generateMagicNumber(measure)
          cmdconfig = cmd+" "+temp+"  "+power
          print cmdconfig
          runProcess(cmdconfig, True)
          print "------------------Sended data to Block-["+timeStamp()+"]---------------------"
      else:
          print "reading..."

main()
