import firebase_admin
from firebase_admin import credentials, db
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# เชื่อมต่อกับ Firebase Realtime Database
cred = credentials.Certificate("firebase_credentials.json")  # ใช้ไฟล์ JSON ที่ได้จาก Firebase
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://friend-723b6-default-rtdb.asia-southeast1.firebasedatabase.app/'  # URL ของ Realtime Database
})

# Route สำหรับแสดง friend.html
@app.route('/')
def show_friend_page():
    return render_template('friend.html')  # ส่งไฟล์ friend.html ไปที่เบราว์เซอร์

# Route สำหรับส่งข้อความใหม่
@app.route('/Friend', methods=['POST'])
def submit_message():
    name = request.form.get('name')
    message = request.form.get('message')

    if not name or not message:
        return jsonify({'error': 'ชื่อและข้อความต้องไม่ว่างเปล่า'}), 400

    try:
        # เพิ่มข้อมูลลงใน Firebase Realtime Database
        ref = db.reference('/messages')  # กำหนดตำแหน่งที่จะเก็บข้อมูลใน Firebase
        new_message_ref = ref.push({
            'sender_name': name,
            'sender_email': 'unknown@example.com',
            'message_type': 'custom',
            'message_text': message,
            'created_at': 'firebase.SERVER_TIMESTAMP',  # ใช้เวลาของ Firebase
            'is_read': False
        })

        # ส่งผลลัพธ์กลับไปที่ client
        if new_message_ref.key:
            return jsonify({'success': 'ส่งข้อความเรียบร้อยแล้ว!'}), 200
        else:
            return jsonify({'error': 'ไม่สามารถส่งข้อมูลไปยัง Firebase ได้'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route สำหรับดึงข้อความที่ยังไม่ได้อ่าน
@app.route('/Friend', methods=['GET'])
def get_unread_messages():
    ref = db.reference('/messages')  # ตำแหน่งข้อมูลใน Realtime Database
    unread_messages = ref.order_by_child('is_read').equal_to(False).get()

    messages = []
    for message in unread_messages.values():
        messages.append(message)

    return jsonify(messages), 200

if __name__ == '__main__':
    app.run(debug=True)
