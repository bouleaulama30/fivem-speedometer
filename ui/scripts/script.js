
window.addEventListener('DOMContentLoaded', () => {
    console.log("Speedometer UI Loaded");
    // speedometer
    const speedValueElm = document.querySelector('.speed-value')
    const unitValueElm = document.querySelector('.unit')
    const gearValueElm = document.querySelector('.gear-value')
    const rpmBarElm = document.querySelector('.rpm-bar')
    const rpmPercentElm = document.querySelector('.rpm-percent')
    const speedometerEntityElm = document.querySelector('.speedometer')
    
    // speedometer settings
    const hudEntityElm = document.querySelector('.hud')
    const oppositeUnitElm = document.querySelector('.hud-switch-unit')
    const closeButtonElm = document.querySelector('.hud-close')
    const hideButtonElm = document.querySelector('.hud-hide')

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

    const setOppositeUnitValue = (unit) => {
        if (unit === "MPH")
            oppositeUnitElm.textContent = "Switch to KM/H";
        else if (unit === "KM/H")
            oppositeUnitElm.textContent = "Switch to MPH";
        else
            oppositeUnitElm.textContent = "Switch to N/A";
        
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
            setOppositeUnitValue(data.unit);
        }

        if (data.action === 'hideSpeedometer'){
            speedometerEntityElm.style.display = 'none';
        }

        if (data.action === 'openSettings'){
            setOppositeUnitValue(data.unit); 
            hudEntityElm.style.display = 'flex';
        }

    })

    oppositeUnitElm.addEventListener("click", ()=> {
        let unit = ""; 

        (oppositeUnitElm.textContent === "Switch to KM/H") ? unit = "KM/H" : (oppositeUnitElm.textContent === "Switch to MPH") ? unit = "MPH" : unit = "N/A"
        console.log(oppositeUnitElm.textContent)
        console.log("Switching unit to ", unit)
        setUnitValue(unit)
        if (unit === "KM/H")
            setOppositeUnitValue("KM/H")
        else if (unit  === "MPH")
            setOppositeUnitValue("MPH")
        else 
            setOppositeUnitValue("N/A")

        // fetch(`https://${GetParentResourceName()}/closeSettings`, {
        //     method: 'POST',
        // });
        
    })

    closeButtonElm.addEventListener("click", ()=> {
        hudEntityElm.style.display = 'none';
        fetch(`https://${GetParentResourceName()}/closeSettings`, {
            method: 'POST',
        });
    })

    // hideButtonElm.addEventListener("click", ()=> {
    //     speedometerEntityElm.style.display = 'none';
    // })

    fetch(`https://${GetParentResourceName()}/switchUnit`, {
        method: 'POST',
    });

})