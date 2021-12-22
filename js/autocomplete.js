

async function autoSearch (){
    const resp =await fetch ('https://coronavirus-tracker-api.herokuapp.com/v2/locations');
    const data = await resp.json();

    let tam = "";

    data.locations.forEach((covid) => {
           tam += covid.country + ', ';
    });
    let arraytam = tam.split(', ');
    
    const uniqueSet = new Set(arraytam);
    const backToArray = [...uniqueSet];

    $("#search-input").autocomplete({

        source : backToArray
    });

};
autoSearch();