// script.js

// 使用 DOMContentLoaded 确保在 DOM 完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
    // --- 配置区域 ---
    const correctSequence = ['2', '0', '8', '5'];
    const secretClickTarget = 'secret_click';
    const secretClickCount = 999;
    const DOWNLOAD_URL = 'YOUR_ACTUAL_DOWNLOAD_LINK_HERE';
    // --- 配置结束 ---

    let currentSequence = [];
    let secretClickCounter = 0;
    let titleClickCount = 0;
    const originalFileIdText = 'XXTXEXXCXXXHXNXXXOPXXXXOXXXLXXXIXXXSXXXX';
    const fileIdSpan = document.getElementById('file-id-text');
    const titleElement = document.getElementById('title');
    // 现在在这里获取元素，DOM肯定已经存在了
    const toggleButton = document.getElementById('toggle-x-btn');
    const statusElement = document.getElementById('status');
    let isXHidden = false;

    // 颜色数组
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

    // 检查按钮元素是否存在，如果不存在则报错
    if (!toggleButton) {
        console.error('错误: 未找到ID为 "toggle-x-btn" 的按钮元素。请检查HTML中是否有该按钮。');
        return; // 如果找不到按钮，停止执行后续代码
    }

    // 为标题添加点击事件监听器
    titleElement.addEventListener('click', function() {
        titleClickCount++;
        if (titleClickCount >= 5) {
            toggleButton.style.display = 'inline-block';
            titleClickCount = 5; 
        }
    });

    // 为按钮添加点击事件监听器
    toggleButton.addEventListener('click', function() {
        if (!isXHidden) {
            hideXFromText();
            this.textContent = '显示X';
        } else {
            showXFromText();
            this.textContent = '去掉X';
        }
        isXHidden = !isXHidden;
    });

    // 初始状态下隐藏按钮
    toggleButton.style.display = 'none';

    // 启动彩色文字动画
    updateRainbowStatus();

    function updateRainbowStatus() {
        const originalText = '等待解密...';
        let rainbowHTML = '';

        for (let i = 0; i < originalText.length; i++) {
            const char = originalText.charAt(i);
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            rainbowHTML += `<span style="color: ${randomColor};">${char}</span>`;
        }
        
        statusElement.innerHTML = rainbowHTML;
        statusElement.className = 'rainbow-text';
        setTimeout(updateRainbowStatus, 500);
    }

    function hideXFromText() {
        const filteredText = originalFileIdText.replace(/X/g, '');
        fileIdSpan.textContent = filteredText;
    }

    function showXFromText() {
        fileIdSpan.textContent = originalFileIdText;
    }

    const clueElements = document.querySelectorAll('.clue, .clue-img');

    clueElements.forEach(element => {
        element.addEventListener('click', function(event) {
            const value = this.getAttribute('data-value');
            
            if (value === secretClickTarget) {
                secretClickCounter++;
                if (secretClickCounter >= secretClickCount) {
                    triggerDownload();
                    return;
                }
            }

            currentSequence.push(value);

            if (currentSequence.length > correctSequence.length) {
                currentSequence.shift();
            }

            if (arraysEqual(currentSequence, correctSequence)) {
                triggerDownload();
            }
        });
    });

    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function triggerDownload() {
        if (!DOWNLOAD_URL || DOWNLOAD_URL === 'YOUR_ACTUAL_DOWNLOAD_LINK_HERE') {
            alert('解密成功！但由于管理员疏忽，惊喜链接尚未配置。请联系管理员！');
            console.error('错误: DOWNLOAD_URL 未设置。请在 script.js 文件中配置真实的下载链接。');
            return;
        }
        const link = document.createElement('a');
        link.href = DOWNLOAD_URL;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

});