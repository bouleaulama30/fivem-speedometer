window.addEventListener('DOMContentLoaded', () => {
    const speedValueElm = document.querySelector('.speed-value')
    const gearValueElm = document.querySelector('.gear-value')

    const setSpeedValue = (speed) => {
        speedValueElm.textContent = speed;
    }

    const setGearValue = (gear) => {
        if (gear === 0)
            gearValueElm.textContent = "R";
        else 
            gearValueElm.textContent = gear;
    }

    window.addEventListener('message', function(event){
        data = event.data;

        if (data.action === 'updateSpeedometer'){
            setSpeedValue(data.speed);
            setGearValue(data.gear);
        }
    })

})