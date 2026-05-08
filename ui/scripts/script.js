
window.addEventListener('DOMContentLoaded', () => {
    const speedValueElm = document.querySelector('.speed-value')
    const unitValueElm = document.querySelector('.unit')
    const gearValueElm = document.querySelector('.gear-value')
    const rpmBarElm = document.querySelector('.rpm-bar')
    const rpmPercentElm = document.querySelector('.rpm-percent')
    const speedometerEntityElm = document.querySelector('.speedometer')

    const setSpeedValue = (speed) => {
        speedValueElm.textContent = speed;
    }

    const setRpmValue = (rpm) => {
        const normalizedRpm = Math.max(0, Math.min(1, Number(rpm) || 0));
        const rpmPercent = Math.round(normalizedRpm * 100);

        rpmBarElm.style.width = `${rpmPercent}%`;
        rpmPercentElm.textContent = `${rpmPercent}%`;

        if (rpmPercent >= 85) {
            rpmBarElm.style.background = 'linear-gradient(90deg, #ff9a3d 0%, #ff6b4a 100%)';
            rpmBarElm.style.boxShadow = '0 0 16px rgba(255, 122, 45, 0.75)';
        } else if (rpmPercent >= 65) {
            rpmBarElm.style.background = 'linear-gradient(90deg, #f7d154 0%, #ff9a3d 100%)';
            rpmBarElm.style.boxShadow = '0 0 14px rgba(247, 209, 84, 0.6)';
        } else {
            rpmBarElm.style.background = 'linear-gradient(90deg, #00ffcc 0%, #00dd99 70%, #7dffb0 100%)';
            rpmBarElm.style.boxShadow = '0 0 14px rgba(0, 255, 204, 0.55)';
        }
    }

    const setGearValue = (gear) => {
        if (gear === 0)
            gearValueElm.textContent = "R";
        else if (gear === -1)
            gearValueElm.textContent = "N";
        else 
            gearValueElm.textContent = gear;
    }

    const setUnitValue = (unit) => {
        if (unit === "KM/H")
            unitValueElm.textContent = "KM/H";
        else if (unit === "MPH")
            unitValueElm.textContent = "MPH";
        else
            unitValueElm.textContent = "N/A";
        
    }

    window.addEventListener('message', function(event){
        const data = event.data;
        if (data.action === 'updateSpeedometer'){
            speedometerEntityElm.style.display = 'flex';
            setSpeedValue(data.speed);
            setGearValue(data.gear);
            setRpmValue(data.rpm);
        }

        if (data.action === 'updateUnit'){
            setUnitValue(data.unit);
        }

        if (data.action === 'hideSpeedometer'){
            speedometerEntityElm.style.display = 'none';
        }
    })

    fetch(`https://${GetParentResourceName()}/switchUnit`, {
        method: 'POST',
    });

})