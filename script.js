async function getSolarPotential(address) {
    try {
        const encodedAddress = encodeURIComponent(address);
        const apiKey = "API KEY";


        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();
        console.log("abcd", geocodeData)
        const location = geocodeData.results[0].geometry.location;
        console.log("location", location)

        // const solarUrl = `https://maps.googleapis.com/maps/api/solar/buildingInsights?location=${location.lat},${location.lng}&key=${apiKey}`;
        const solarUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${location.lat}&location.longitude=${location.lng}&requiredQuality=HIGH&key=${apiKey}`
        //https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=37.4450&location.longitude=-122.1390&requiredQuality=HIGH&key=YOUR_API_KEY
        console.log("example", "https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=37.4450&location.longitude=-122.1390&requiredQuality=HIGH&key=YOUR_API_KEY")
        console.log("actual", solarUrl)
        const solarResponse = await fetch(solarUrl);
        console.log("solar", solarResponse)
        const solarData = await solarResponse.json();


        return solarData;
    } catch (error) {
        console.error('Error fetching solar potential data:', error);
        return null;
    }
}

document.getElementById('solar-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = document.getElementById('address').value;
    const solarPotential = await getSolarPotential(address);
    const resultsElement = document.getElementById('solar-results');
    resultsElement.innerHTML = JSON.stringify(solarPotential, null, 2);
});

