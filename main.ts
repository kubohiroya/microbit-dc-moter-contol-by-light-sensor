function 加速度を更新 () {
    if (回転残カウント >= 回転残カウント初期値 - 加減速カウント) {
        加速度 = 加速度の初期値
    } else {
        if (回転残カウント >= 加減速カウント) {
            加速度 = 0
        } else {
            加速度 = 加速度の初期値 * -1
        }
    }
}
input.onButtonPressed(Button.A, function () {
    回転スタート()
})
function 速度を更新 () {
    速度 += 加速度
    速度 = Math.constrain(速度, 0, 1023)
}
function 回転ストップ () {
    if (回転残カウント >= 加減速カウント) {
        回転残カウント = 加減速カウント
    }
}
function 回転 (数値: number) {
    pins.analogWritePin(AnalogPin.P1, 数値)
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
input.onButtonPressed(Button.B, function () {
    回転ストップ()
})
function 回転残カウントを更新 () {
    if (回転残カウント > 0) {
        回転残カウント += -1
    } else {
        回転残カウント = 0
    }
}
function 回転スタート () {
    if (input.lightLevel() >= 1) {
        明るさセンサー残カウント = 明るさセンサー残カウント初期値
    } else {
        if (明るさセンサー残カウント > 0) {
            明るさセンサー残カウント += -1
            回転残カウント = 回転残カウント初期値
        } else {
            明るさセンサー残カウント = 0
        }
    }
}
function 回転残カウント割合表示 (数値: number) {
    for (let y = 0; y <= 4; y++) {
        for (let x = 0; x <= 4; x++) {
            if (数値 > y * 0.2 + x * 0.04) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
    }
}
let 加速度 = 0
let 速度 = 0
let 加速度の初期値 = 0
let 加減速カウント = 0
let 明るさセンサー残カウント = 0
let 明るさセンサー残カウント初期値 = 0
let 回転残カウント = 0
let 回転残カウント初期値 = 0
pins.digitalWritePin(DigitalPin.P14, 1)
回転残カウント初期値 = 60
回転残カウント = 0
明るさセンサー残カウント初期値 = 60
明るさセンサー残カウント = 明るさセンサー残カウント初期値
加減速カウント = 20
加速度の初期値 = 60
速度 = 0
loops.everyInterval(100, function () {
    回転スタート()
    加速度を更新()
    速度を更新()
    回転(速度)
    回転残カウントを更新()
    回転残カウント割合表示(回転残カウント / 回転残カウント初期値)
})
