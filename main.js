const wait_time = 2000;
const letter_duration = 100;

const noop = () => { };

function onLoad() {
    const text = [
        "programador",
        "cientista de dados",
        "desenvolvedor web",
        "hacker",
        "UI designer"
    ];

    loopAnimation(text.reverse());
}

function loopAnimation(text) {
    text.reduce(
        (result, data) => {
            const color = randomColor();
            const writeTxt = write("forward", data, color);
            const eraseTxt = write("backward", data, color);

            return writeTxt(wait(eraseTxt(result)));
        },
        () => loopAnimation(text)
    )();
}

const randomColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;

const wait = (done) => () => {
    const timerId = setTimeout(run, wait_time);

    function run() {
        done();
        clearTimeout(timerId);
    }
};

const write = (direction, text, color) => (callback) => () => {
    const animatedText = document.querySelector(".animated_text");
    const underline = document.querySelector(".underline");
    animatedText.style.color = color;
    underline.style.background = color;

    let counter = direction === "forward" ? 0 : text.length - 1;

    const timerId = setInterval(run, letter_duration);

    function run() {
        animatedText.innerHTML = text.substring(0, counter);
        const doneForward = counter === text.length + 1;
        const doneBackward = counter === -1;

        if (doneForward || doneBackward) {
            clearInterval(timerId);
            callback();
        }

        counter = direction === "forward" ? counter + 1 : counter - 1;
    }
};

window.addEventListener("load", onLoad);