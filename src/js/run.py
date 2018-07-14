#!/usr/bin/python

# ===============
# = Run Process =
# ===============
def runProcess(command,shell=False):
    import subprocess
    p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=shell)
    return iter(p.stdout.readline, b'')

cmd = '/usr/bin/node ./run.js 32 124'
for line in runProcess(cmd, True):
    print(line)
