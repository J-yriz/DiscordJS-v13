const { createCanvas, loadImage, registerFont } = require('canvas')
const fs = require('fs');
const { dataProfile } = require('../../../API/instagram/index.js');


module.exports = {
    imageIG: async (nama) => {
        const canvas = createCanvas(850, 265)
        const ctx = canvas.getContext('2d')

        return dataProfile(nama)
            .then((data) => {
                if (data === 'error') {
                    return 'error'
                } else {
                    registerFont('Font/Segoe-UI/Segoe-UI.ttf', { family: 'Segoe UI' })
                    registerFont('Font/Segoe-UI/Segoe-UI-Bold.ttf', { family: 'Segoe UI Bold' })

                    ctx.fillStyle = '#0e0f0f';
                    ctx.fillRect(0, 0, 850, 265)

                    ctx.fillStyle = "#e5e3df";
                    ctx.font = "28px 'Segoe UI Bold'";
                    ctx.textAlign = "left";
                    if (data.username.length <= 7) {
                        ctx.fillText(data.username, 285, 70)
                    } else if (data.username.length == 8 || data.username.length <= 10) {
                        ctx.fillText(data.username, 285, 70)
                    } else if (data.username.length == 11 || data.username.length <= 16) {
                        ctx.fillText(data.username, 285, 70)
                    } else if (data.username.length == 17 || data.username.length >= 20) {
                        ctx.fillText(data.username.slice(0, 14) + '....', 285, 70)
                    }

                    ctx.fillStyle = "#e5e3df";
                    ctx.font = "17px 'Segoe UI Bold'";
                    ctx.textAlign = "left";
                    ctx.fillText(`${data.posting}`, 289, 130)
                    ctx.fillText(`${data.follower}`, 400, 130)
                    ctx.fillText(`${data.followed}`, 530, 130)
                    ctx.fillText(data.fullName, 289, 170)

                    // ctx.fillStyle = "#CAE4F1";
                    // ctx.font = "17px 'Segoe UI Bold'";
                    // ctx.textAlign = "left";
                    // ctx.fillText(data.extraBio.replace("https://", ""), 289, 225)

                    ctx.fillStyle = "#e5e3df";
                    ctx.font = "17px 'Segoe UI'";
                    ctx.textAlign = "left";
                    if (data.posting.length < 3) {
                        ctx.fillText(`kiriman`, 308, 130)
                    } else if (data.posting.length <= 5) {
                        ctx.fillText(`kiriman`, 328, 130)
                    }
                    if (data.posting.length < 3) {
                        ctx.fillText(`pengikut`, 428, 130)
                    } else if (data.posting.length <= 5) {
                        ctx.fillText(`pengikut`, 448, 130)
                    }
                    if (data.posting.length < 3) {
                        ctx.fillText(`diikuti`, 550, 130)
                    } else if (data.posting.length <= 5) {
                        ctx.fillText(`diikuti`, 570, 130)
                    }

                    ctx.fillText(data.bio, 289, 195)

                    loadImage('./API/instagram/dataCanvas/placeProfile.png')
                        .then((image) => {
                            loadImage(data.profile)
                                .then((img) => {
                                    ctx.beginPath()
                                    ctx.arc(130, 105, 85, 85, 0, Math.PI * 2);
                                    ctx.clip();
                                    ctx.drawImage(image, 45, 20)

                                    ctx.beginPath()
                                    ctx.arc(130, 105, 75, 75, 0, Math.PI * 2);
                                    ctx.clip();
                                    ctx.drawImage(img, 55, 30)

                                    const buffer = canvas.toBuffer("image/png");
                                    fs.writeFileSync("src/commands/google/image.png", buffer);
                                })
                        })

                    loadImage('./API/instagram/dataCanvas/igSend.png')
                        .then((igSend) => {
                            if (data.username.length <= 7) {
                                ctx.drawImage(igSend, 385, 40)
                                const buffer = canvas.toBuffer("image/png");
                                fs.writeFileSync("src/commands/google/image.png", buffer);
                            } else if (data.username.length == 8 || data.username.length <= 10) {
                                ctx.drawImage(igSend, 440, 40)
                                const buffer = canvas.toBuffer("image/png");
                                fs.writeFileSync("src/commands/google/image.png", buffer);
                            } else if (data.username.length == 11 || data.username.length <= 15) {
                                ctx.drawImage(igSend, 475, 40)
                                const buffer = canvas.toBuffer("image/png");
                                fs.writeFileSync("src/commands/google/image.png", buffer);
                            } else if (data.username.length == 16 || data.username.length >= 20) {
                                ctx.drawImage(igSend, 510, 40)
                                const buffer = canvas.toBuffer("image/png");
                                fs.writeFileSync("src/commands/google/image.png", buffer);
                            }
                        })
                }
            })
    }
}