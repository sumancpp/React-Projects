// src/Command.jsx
const OPENWEATHER_API_KEY = "Your Api Key";

export async function takeCommand(
  command,
  aiResponse,
  setResponse,
  setSpeaking,
  setPrompt,
  speak
) {
  if (!command || typeof command !== "string") return;

  command = command.toLowerCase().trim();

  // Helper function to handle responses consistently
  const handleResponse = async (message, resetPrompt = "Tap to start listening...") => {
    setResponse(true);
    setSpeaking(true);
    setPrompt(message);
    await speak(message);
    
    setTimeout(() => {
      setResponse(false);
      setSpeaking(false);
      setPrompt(resetPrompt);
    }, 1000);
  };

  // ✅ Common sites map
  const sites = {
    youtube: "https://www.youtube.com/",
    google: "https://www.google.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://www.twitter.com/",
    linkedin: "https://www.linkedin.com/",
    github: "https://www.github.com/",
    chatgpt: "https://chat.openai.com/",
    gemini: "https://gemini.google.com/",
    claude: "https://claude.ai/",
    perplexity: "https://www.perplexity.ai/",
    gork: "https://grok.com/", 
    aifiresta: "https://chat.aifiesta.ai/", 
    reddit: "https://www.reddit.com/",
    netflix: "https://www.netflix.com/",
    amazon: "https://www.amazon.com/",
    whatsapp: "https://web.whatsapp.com/",
    tiktok: "https://www.tiktok.com/",
    pinterest: "https://www.pinterest.com/",
    quora: "https://www.quora.com/",
    stackoverflow: "https://stackoverflow.com/",
    twitch: "https://www.twitch.tv/",
    spotify: "https://www.spotify.com/",
    zoom: "https://zoom.us/",
    paypal: "https://www.paypal.com/",
    microsoft: "https://www.microsoft.com/",
    apple: "https://www.apple.com/",
    yahoo: "https://www.yahoo.com/",
    bing: "https://www.bing.com/",
    imdb: "https://www.imdb.com/",
    canva: "https://www.canva.com/",
    coursera: "https://www.coursera.org/",
    udemy: "https://www.udemy.com/",
    medium: "https://medium.com/"
};


  // ✅ Open site command
  for (const key in sites) {
    if (command.includes("open") && command.includes(key)) {
      // For mobile, opening in new tab might be blocked
      if (window.innerWidth <= 768) {
        window.location.href = sites[key];
      } else {
        window.open(sites[key], "_blank");
      }
      await handleResponse(`Opening ${key}...`);
      return;
    }
  }

  // ✅ Tell time
  if (command.includes("time")) {
    const time = new Date().toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit",
      hour12: true 
    });
    await handleResponse(`The time is ${time}`);
    return;
  }

  // ✅ Tell date
  if (command.includes("date")) {
    const date = new Date().toLocaleDateString([], { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
    await handleResponse(`Today's date is ${date}`);
    return;
  }

  // ✅ Location with timeout for mobile
  if (command.includes("where am i") || command.includes("my location")) {
    if (!navigator.geolocation) {
      await handleResponse("Sorry, your browser does not support location services.");
      return;
    }

    setResponse(true);
    setSpeaking(true);
    setPrompt("Getting your location...");

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 second timeout for mobile
      maximumAge: 300000 // 5 minute cache
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        let message = `Your coordinates are Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`;
        if (accuracy > 1000) {
          message += " (approximate location)";
        }

        setPrompt(message);
        await speak(`You are at Latitude ${lat.toFixed(2)} and Longitude ${lon.toFixed(2)}`);
        
        setTimeout(() => {
          setResponse(false);
          setSpeaking(false);
          setPrompt("Tap to start listening...");
        }, 1000);
      },
      async (error) => {
        let errorMessage = "Cannot access location.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }

        setPrompt(errorMessage);
        await speak(errorMessage);
        
        setTimeout(() => {
          setResponse(false);
          setSpeaking(false);
          setPrompt("Tap to start listening...");
        }, 1000);
      },
      options
    );
    return;
  }

  // ✅ Weather with better mobile handling
  if (command.includes("weather")) {
    const cityMatch = command.match(/weather in (.+)/);

    if (cityMatch && cityMatch[1]) {
      // Weather for specific city
      const city = cityMatch[1].trim();
      
      try {
        setResponse(true);
        setSpeaking(true);
        setPrompt(`Getting weather for ${city}...`);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );

        if (!res.ok) {
          if (res.status === 404) {
            await handleResponse(`Sorry, I couldn't find weather data for ${city}.`);
          } else {
            throw new Error("Weather API failed");
          }
          return;
        }

        const data = await res.json();
        const cityName = data.name;
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        
        const message = `The weather in ${cityName} is ${temp}°C with ${condition}.`;
        setPrompt(message);
        await speak(message);

      } catch (error) {
        console.error("Weather API failed:", error);
        await handleResponse("I couldn't fetch the weather at the moment. Please try again later.");
      }

      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
        setPrompt("Tap to start listening...");
      }, 1000);

    } else {
      // Weather for current location
      if (!navigator.geolocation) {
        await handleResponse("Your browser doesn't support location services. Please ask for weather in a specific city.");
        return;
      }

      setResponse(true);
      setSpeaking(true);
      setPrompt("Getting your location for weather...");

      const options = {
        enableHighAccuracy: false, // Faster on mobile
        timeout: 8000,
        maximumAge: 600000 // 10 minute cache for weather
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            setPrompt("Fetching weather data...");
            
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
            );

            if (!res.ok) throw new Error("Weather API failed");

            const data = await res.json();
            const city = data.name;
            const temp = Math.round(data.main.temp);
            const condition = data.weather[0].description;

            const message = `The weather in your current location, ${city}, is ${temp}°C with ${condition}.`;
            setPrompt(message);
            await speak(message);

          } catch (error) {
            console.error("Weather API failed:", error);
            setPrompt("Couldn't fetch weather data.");
            await speak("I couldn't fetch the weather for your location at the moment.");
          }

          setTimeout(() => {
            setResponse(false);
            setSpeaking(false);
            setPrompt("Tap to start listening...");
          }, 1000);
        },
        async (error) => {
          let errorMessage = "Cannot access your location for weather.";
          
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please ask me for weather in a specific city.";
          }
          
          setPrompt(errorMessage);
          await speak(errorMessage);
          
          setTimeout(() => {
            setResponse(false);
            setSpeaking(false);
            setPrompt("Tap to start listening...");
          }, 1000);
        },
        options
      );
    }
    return;
  }

  // ✅ Nearby places with mobile-friendly URLs
  if (
    command.includes("restaurant") ||
    command.includes("restaurants nearby") ||
    command.includes("hospital") ||
    command.includes("cafe") ||
    command.includes("cafes nearby") ||
    command.includes("school") ||
    command.includes("schools nearby") ||
    command.includes("college") ||
    command.includes("colleges nearby") ||
    command.includes("park") ||
    command.includes("playground") ||
    command.includes("hotel") ||
    command.includes("hotels nearby") ||
    command.includes("river")
  ) {
    if (!navigator.geolocation) {
      await handleResponse("Your browser doesn't support location services. Please use a map app to find nearby places.");
      return;
    }

    setResponse(true);
    setSpeaking(true);
    setPrompt("Getting your location...");

    const options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 300000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Determine place type
        let placeType = "restaurant";
        if (command.includes("hospital")) placeType = "hospital";
        else if (command.includes("cafe")) placeType = "cafe";
        else if (command.includes("school")) placeType = "school";
        else if (command.includes("college")) placeType = "college";
        else if (command.includes("park")) placeType = "park";
        else if (command.includes("playground")) placeType = "playground";
        else if (command.includes("hotel")) placeType = "hotel";
        else if (command.includes("river")) placeType = "river";

        setPrompt(`Opening nearby ${placeType} on Google Maps...`);
        await speak(`Showing nearby ${placeType} on Google Maps.`);

        // Mobile-friendly Google Maps URL
        const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(placeType)}/@${latitude},${longitude},15z`;
        
        // On mobile, direct navigation works better than new tab
        if (window.innerWidth <= 768) {
          window.location.href = mapsUrl;
        } else {
          window.open(mapsUrl, "_blank");
        }

        setTimeout(() => {
          setResponse(false);
          setSpeaking(false);
          setPrompt("Tap to start listening...");
        }, 1000);
      },
      async (error) => {
        let errorMessage = "Cannot access location.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services to find nearby places.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "Cannot access location. Please use a map application.";
        }

        setPrompt(errorMessage);
        await speak(errorMessage);
        
        setTimeout(() => {
          setResponse(false);
          setSpeaking(false);
          setPrompt("Tap to start listening...");
        }, 1000);
      },
      options
    );
    return;
  }

  // ✅ Fallback to AI
  aiResponse(command);
}
