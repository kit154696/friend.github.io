// server.js - เซิร์ฟเวอร์ Express อย่างง่ายเพื่อจัดการการส่งข้อความ

const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// มิดเดิลแวร์
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ให้บริการไฟล์สถิตจากไดเรกทอรี 'public'
app.use(express.static('public'));

// พูลการเชื่อมต่อฐานข้อมูล
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'รหัสผ่านของคุณ', // แทนที่ด้วยรหัสผ่าน MySQL ของคุณ
  database: 'friend_messages',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// เส้นทาง
app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, messageType, message } = req.body;
    
    // การตรวจสอบพื้นฐาน
    if (!name || !email || !messageType || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' 
      });
    }
    
    // เพิ่มข้อความลงในฐานข้อมูล
    const [result] = await pool.execute(
      'INSERT INTO messages (sender_name, sender_email, message_type, message_text) VALUES (?, ?, ?, ?)',
      [name, email, messageType, message]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'ส่งข้อความเรียบร้อยแล้ว',
      id: result.insertId
    });
    
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึกข้อความ:', error);
    res.status(500).json({ 
      success: false, 
      message: 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง' 
    });
  }
});

// เส้นทางเพื่อดึงข้อความทั้งหมด (คุณอาจต้องการเพิ่มการรับรองตัวตนสำหรับเส้นทางนี้)
app.get('/api/messages', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM messages ORDER BY created_at DESC');
    res.status(200).json({ success: true, messages: rows });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อความ:', error);
    res.status(500).json({ 
      success: false, 
      message: 'ไม่สามารถดึงข้อความได้ กรุณาลองใหม่อีกครั้ง' 
    });
  }
});

// เส้นทางเพื่อทำเครื่องหมายว่าข้อความถูกอ่านแล้ว
app.put('/api/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('UPDATE messages SET is_read = TRUE WHERE id = ?', [id]);
    res.status(200).json({ success: true, message: 'ทำเครื่องหมายว่าอ่านแล้ว' });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัปเดตข้อความ:', error);
    res.status(500).json({ 
      success: false, 
      message: 'ไม่สามารถอัปเดตข้อความได้ กรุณาลองใหม่อีกครั้ง' 
    });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานที่ http://localhost:${port}`);
});

// การจัดการข้อผิดพลาด
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});
document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    
    // จัดการการส่งฟอร์ม
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // แสดง loading
        loading.style.display = 'block';

        // ส่งข้อมูลไปยังเซิร์ฟเวอร์ Flask
        const formData = new FormData(messageForm);

        fetch('/submit_message', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';
            if (data.success) {
                showSuccessMessage();
            } else {
                console.error('Error:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = 'none';
        });
    });

    // ฟังก์ชันแสดงข้อความสำเร็จ
    function showSuccessMessage() {
        successMessage.style.display = 'block';
        messageForm.reset();

        // ซ่อนข้อความสำเร็จหลังจาก 5 วินาที
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }
});
