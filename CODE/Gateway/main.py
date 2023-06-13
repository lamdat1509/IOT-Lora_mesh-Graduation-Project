import serial
import time
from firebase import firebase
import threading
firebase = firebase.FirebaseApplication(
    'https://datiot-f0d92-default-rtdb.firebaseio.com/', None)

ser = serial.Serial(
    port='COM3',
    baudrate=9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
)
last_send_time = time.time()

# def handmade():
#     if flag_den == 1:
#         ## gửi tin về node để bật đèn
#         ser.write("4_3_O ".encode())
#     else:  
#         ## gửi tin về node để bật đèn 
#         ser.write("4_3_F ".encode())

# def automatic():
#     if  payload == '1 ' :
#         firebase.put('/den', 'den', 1)
#         firebase.put('/den', 'tt', 1)      
#         ser.write("4_3_O ".encode())
#         #gửi tin về node để bật đèn 
#     else:
#         firebase.put('/den', 'den', 0)
#         firebase.put('/den', 'tt', 0)
#         ser.write("4_3_F ".encode())
#         # gửi tin về node để tất đèn
# def handmadeM():
#     if flag_M == 1:
#         ## gửi tin về node để bật đèn
#         ser.write("4_2_O ".encode())
#     else:  
#         ## gửi tin về node để bật đèn 
#         ser.write("4_2_F ".encode())

# def automaticM():
#     if  int(payload) < 60:
#         firebase.put('/motor', 'motor', 1)    
#         ser.write("4_2_O ".encode())
#     else:
#         firebase.put('/motor', 'motor', 0)
#         ser.write("4_2_F ".encode())
def receive():
    buffer =''
    while True:
        # start_time = time.time()  # Lấy thời điểm bắt đầu của vòng 
        data = ser.read().decode('utf-8', errors='ignore')
    #     print(data)
    #     ser.write("4_2_D \n".encode())
        buffer += data
        if data == ' ':
            if buffer.count('_') == 2:
                # print(buffer[:-1])  # In ra chuỗi trước đó mà không bao gồm ký tự ' '
                src_addr, dest_addr, payload = buffer.split('_')
                if dest_addr == '4':
                    if src_addr == '1':
                        print("NODE 1 : "+ str(buffer))
                        firebase.put('/nhietDo', 'nhietDo', int(payload))              
                    elif src_addr == '2':
                        flag_M = firebase.get('/motor','motor') # Lấy giá trị của trạng thái đèn từ Firebas
                        mode2 = firebase.get('/mode2','mode2')
                        print("NODE 2 : "+ str(buffer))
                        firebase.put('/Hum', 'Hum',int(payload))
                        if mode2 == 1:
                            if flag_M == 1:
                                ## gửi tin về node để bật đèn
                                ser.write("4_2_O ".encode())
                            else:  
                                ## gửi tin về node để bật đèn 
                                ser.write("4_2_F ".encode())
                        else:
                            if  int(payload) < 60:
                                firebase.put('/motor', 'motor', 1)    
                                ser.write("4_2_O ".encode())
                            else:
                                firebase.put('/motor', 'motor', 0)
                                ser.write("4_2_F ".encode())
                    elif src_addr == '3':
                        flag_den = firebase.get('/den','den') # Lấy giá trị của trạng thái đèn từ Firebase
                        mode = firebase.get('/mode','mode')
                        print("NODE 3 : "+ str(buffer))
                        if mode == 1:
                            if flag_den == 1 :
                                ser.write("4_3_O ".encode())
                            else:  
                                ## gửi tin về node để bật đèn 
                                ser.write("4_3_F ".encode())
                        else:
                            if  payload == '1 ' :
                                firebase.put('/den', 'den', 1)
                                firebase.put('/den', 'tt', 1)      
                                ser.write("4_3_O ".encode())
                                #gửi tin về node để bật đèn 
                            else:
                                firebase.put('/den', 'den', 0)
                                firebase.put('/den', 'tt', 0)
                                ser.write("4_3_F ".encode())
                buffer = ''
            buffer =''
def transmit():
    while True:
        ser.write("4_1_T ".encode())
        print('REQUEST NODE 1')
        time.sleep(5)
        ser.write("4_2_D ".encode())
        print('REQUEST NODE 2')
        time.sleep(5)
        ser.write("4_3_A ".encode())
        print('REQUEST NODE 3') 
        time.sleep(5)
        
          
transmit_thread = threading.Thread(target=transmit)
receive_thread = threading.Thread(target=receive)
# Khởi chạy các luồng
transmit_thread.start()
receive_thread.start()