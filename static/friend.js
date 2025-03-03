document.addEventListener('DOMContentLoaded', function() {
    // เลือกหัวข้อและข้อความที่ต้องการให้มีเอฟเฟกต์พิมพ์
    const elementsToAnimate = [
        { selector: 'h1', delay: 500 },
        { selector: 'label', delay: 1500 }
    ];
    
    // สร้างเอฟเฟกต์พิมพ์สำหรับแต่ละองค์ประกอบ
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        elements.forEach((element, index) => {
            // เก็บข้อความเดิม
            const originalText = element.textContent;
            // ล้างข้อความเดิม
            element.textContent = '';
            
            // เพิ่ม <span> สำหรับข้อความที่จะพิมพ์
            const typingTextSpan = document.createElement('span');
            typingTextSpan.className = 'typing-text';
            element.appendChild(typingTextSpan);
            
            // เพิ่มเคอร์เซอร์
            const cursorSpan = document.createElement('span');
            cursorSpan.className = 'typed-cursor';
            element.appendChild(cursorSpan);
            
            // หน่วงเวลาก่อนเริ่มพิมพ์
            setTimeout(() => {
                typeText(typingTextSpan, originalText);
            }, item.delay + (index * 150));
        });
    });
    
    // ฟังก์ชันสำหรับพิมพ์ข้อความทีละตัว
    function typeText(element, text, i = 0) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => {
                typeText(element, text, i + 1);
            }, 30 + Math.random() * 40); // ความเร็วในการพิมพ์แต่ละตัวอักษรแบบสุ่มเล็กน้อย
        } else {
            // ลบเคอร์เซอร์เมื่อพิมพ์เสร็จ
            const cursor = element.nextElementSibling;
            if (cursor && cursor.className === 'typed-cursor') {
                cursor.remove();
            }
        }
    }
    
    // เพิ่มเอนิเมชันให้กับปุ่มและฟอร์ม
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // สร้างเอฟเฟกต์คลิกสำหรับปุ่ม
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', function(e) {
            // สร้างเอฟเฟกต์ริปเปิล (คลื่น) เมื่อคลิก
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            ripple.style.borderRadius = '50%';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            const anim = ripple.animate(
                [
                    { width: '0', height: '0', opacity: 1 },
                    { width: '300px', height: '300px', opacity: 0 }
                ],
                {
                    duration: 600,
                    easing: 'ease-out'
                }
            );
            
            anim.onfinish = () => ripple.remove();
            
            // แสดงตัวโหลดและข้อความสำเร็จสำหรับการสาธิต
            const loadingEl = document.querySelector('.loading');
            const successEl = document.querySelector('.success-message');
            
            if (loadingEl) {
                loadingEl.style.display = 'block';
                loadingEl.classList.add('show');
                
                setTimeout(() => {
                    loadingEl.classList.remove('show');
                    setTimeout(() => {
                        loadingEl.style.display = 'none';
                        if (successEl) {
                            successEl.style.display = 'block';
                            successEl.classList.add('show');
                        }
                    }, 300);
                }, 1500);
            }
        });
    }
    
    // เพิ่มการเลือกประเภทข้อความ
    const messageTypes = document.querySelectorAll('.message-type');
    messageTypes.forEach(type => {
        type.addEventListener('click', function() {
            messageTypes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});




























document.addEventListener('DOMContentLoaded', function() {
    // เลือกหัวข้อและข้อความที่ต้องการให้มีเอฟเฟกต์พิมพ์แบบไฟรุ้ง
    const elementsToAnimate = [
        
       
    ];
    
    // สร้างเอฟเฟกต์พิมพ์สำหรับแต่ละองค์ประกอบ
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        elements.forEach((element, index) => {
            // เก็บข้อความเดิม
            const originalText = element.textContent;
            // ล้างข้อความเดิม
            element.textContent = '';
            
            // เพิ่ม <span> สำหรับข้อความที่จะพิมพ์
            const typingTextSpan = document.createElement('span');
            typingTextSpan.className = 'typing-text';
            element.appendChild(typingTextSpan);
            
            // เพิ่มเคอร์เซอร์
            const cursorSpan = document.createElement('span');
            cursorSpan.className = 'typed-cursor';
            element.appendChild(cursorSpan);
            
            // หน่วงเวลาก่อนเริ่มพิมพ์
            setTimeout(() => {
                typeText(typingTextSpan, originalText);
            }, item.delay + (index * 150));
        });
    });
    
    // ฟังก์ชันสำหรับพิมพ์ข้อความทีละตัวแบบไฟรุ้ง
    function typeText(element, text, i = 0) {
        if (i < text.length) {
            // สร้างตัวอักษรเดี่ยวด้วยเอฟเฟกต์ไฟ
            const charSpan = document.createElement('span');
            charSpan.className = 'fire-char';
            charSpan.textContent = text.charAt(i);
            element.appendChild(charSpan);
            
            // เพิ่มเอฟเฟกต์การติดไฟหลังจากปรากฏ
            setTimeout(() => {
                charSpan.classList.add('active');
                
                // เพิ่มพาร์ติเคิลไฟที่ลอยขึ้นจากตัวอักษร
                createFireParticles(charSpan);
            }, 100);
            
            setTimeout(() => {
                typeText(element, text, i + 1);
            }, 80 + Math.random() * 50); // ความเร็วในการพิมพ์แต่ละตัวอักษรแบบสุ่มเล็กน้อย
        } else {
            // ลบเคอร์เซอร์เมื่อพิมพ์เสร็จหลังจากหน่วงเวลา
            setTimeout(() => {
                const cursor = element.nextElementSibling;
                if (cursor && cursor.className === 'typed-cursor') {
                    cursor.remove();
                }
            }, 1000);
        }
    }
    
    // ฟังก์ชันสร้างพาร์ติเคิลไฟที่ลอยขึ้นจากตัวอักษร
    function createFireParticles(charElement) {
        // เพิ่มพาร์ติเคิลไฟเป็นระยะ
        const particleInterval = setInterval(() => {
            if (!document.body.contains(charElement)) {
                clearInterval(particleInterval);
                return;
            }
            
            // สร้างพาร์ติเคิลจำนวนสุ่ม
            const particleCount = Math.floor(Math.random() * 2) + 1;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'fire-particle';
                
                // ตำแหน่งสุ่มใต้ตัวอักษร
                const rect = charElement.getBoundingClientRect();
                const x = rect.left + Math.random() * rect.width;
                const y = rect.bottom;
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // ขนาดสุ่ม
                const size = 3 + Math.random() * 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // สุ่มสี
                const hue = Math.floor(Math.random() * 60); // สุ่มในช่วงสีแดง-เหลือง
                particle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%), hsl(${hue - 20}, 100%, 50%))`;
                
                // เพิ่มเข้าไปใน body
                document.body.appendChild(particle);
                
                // ลบพาร์ติเคิลหลังจากแอนิเมชันเสร็จสิ้น
                setTimeout(() => {
                    if (particle && document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }, 2000);
            }
        }, 150);
        
        // หยุดการสร้างพาร์ติเคิลหลังจาก 5 วินาที
        setTimeout(() => {
            clearInterval(particleInterval);
        },
5000);
    }
    
    // เพิ่มเอนิเมชันให้กับปุ่มและฟอร์ม
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // เพิ่มเอฟเฟกต์ไฟเมื่อพิมพ์ในช่องข้อความ
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.addEventListener('input', function(e) {
                // สร้างพาร์ติเคิลไฟที่ลอยขึ้นจากตำแหน่งเคอร์เซอร์
                const rect = this.getBoundingClientRect();
                
                // ประมาณตำแหน่งเคอร์เซอร์จากความยาวข้อความ
                const textLength = this.value.length;
                const charWidth = 10; // ประมาณความกว้างของตัวอักษร
                const x = rect.left + Math.min(textLength * charWidth, rect.width - 20);
                const y = rect.top + rect.height / 2;
                
                // สร้างพาร์ติเคิล
                const particle = document.createElement('div');
                particle.className = 'fire-particle';
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // ขนาดสุ่ม
                const size = 3 + Math.random() * 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // สุ่มสี
                const hue = Math.floor(Math.random() * 360);
                particle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%), hsl(${hue - 30}, 100%, 50%))`;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle && document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }, 2000);
            });
        }
    });
    
    // สร้างเอฟเฟกต์คลิกสำหรับปุ่มพร้อมเอฟเฟกต์ไฟรุ้ง
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', function(e) {
            // สร้างเอฟเฟกต์ริปเปิล (คลื่น) เมื่อคลิก
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // สร้างวงกลมรุ้งขยายออก
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,0,0,0.5) 20%, rgba(255,255,0,0.5) 40%, rgba(0,255,0,0.5) 60%, rgba(0,0,255,0.5) 80%, rgba(255,0,255,0) 100%)';
            ripple.style.borderRadius = '50%';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.zIndex = '0';
            
            this.appendChild(ripple);
            
            const anim = ripple.animate(
                [
                    { width: '0', height: '0', opacity: 1 },
                    { width: '400px', height: '400px', opacity: 0 }
                ],
                {
                    duration: 800,
                    easing: 'ease-out'
                }
            );
            
            anim.onfinish = () => ripple.remove();
            
            // ระเบิดพาร์ติเคิลรอบปุ่ม
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'fire-particle';
                    
                    // ตำแหน่งสุ่มรอบปุ่ม
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 20 + Math.random() * 30;
                    const particleX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
                    const particleY = rect.top + rect.height / 2 + Math.sin(angle) * distance;
                    
                    particle.style.left = `${particleX}px`;
                    particle.style.top = `${particleY}px`;
                    
                    // ขนาดสุ่ม
                    const size = 4 + Math.random() * 6;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    // สุ่มสี
                    const hue = Math.floor(Math.random() * 360);
                    particle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%), hsl(${hue - 30}, 100%, 50%))`;
                    
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        if (particle && document.body.contains(particle)) {
                            document.body.removeChild(particle);
                        }
                    }, 2000);
                }, i * 50);
            }
            
            // แสดงตัวโหลดและข้อความสำเร็จสำหรับการสาธิต
            const loadingEl = document.querySelector('.loading');
            const successEl = document.querySelector('.success-message');
            
            if (loadingEl) {
                loadingEl.style.display = 'block';
                loadingEl.classList.add('show');
                
                setTimeout(() => {
                    loadingEl.classList.remove('show');
                    setTimeout(() => {
                        loadingEl.style.display = 'none';
                        if (successEl) {
                            successEl.style.display = 'block';
                            successEl.classList.add('show');
                        }
                    }, 300);
                }, 1500);
            }
        });
    }
    
    // เพิ่มการเลือกประเภทข้อความพร้อมเอฟเฟกต์
    const messageTypes = document.querySelectorAll('.message-type');
    messageTypes.forEach(type => {
        type.addEventListener('click', function() {
            messageTypes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // เพิ่มเอฟเฟกต์พาร์ติเคิลเมื่อคลิก
            const rect = this.getBoundingClientRect();
            
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'fire-particle';
                
                // ตำแหน่งสุ่มเหนือปุ่มที่คลิก
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + rect.height / 2;
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // ขนาดสุ่ม
                const size = 3 + Math.random() * 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // สุ่มสี
                const hue = Math.floor(Math.random() * 360);
                particle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%), hsl(${hue - 30}, 100%, 50%))`;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle && document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }, 2000);
            }
        });
    });
});