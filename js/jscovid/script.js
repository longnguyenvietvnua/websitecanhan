
const Apiurl = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=VN';
const Apiurl2 = 'https://api.covid19api.com/summary';
const Default = '--';
//Hàm format 
const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "N";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "TR";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "T";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };
  

// Hàm mặc đinh khi vào web
async function CovidDefault(){
    const resp =await fetch (Apiurl)
    .catch($('#data-covid').text('Không có kết nối sever xin hãy đợi 1 phút'));
    const data = await resp.json();
       

    $('#alert-err').hide();
    const CounTry = data.locations[0].country;
    const CounTry_Code = data.locations[0].country_code.toLowerCase();
    const Province = data.province;
    const Confirmed =new Intl.NumberFormat().format(data.locations[0].latest.confirmed);
    const Deaths =new Intl.NumberFormat().format(data.locations[0].latest.deaths);
    const Update = (data.locations[0].last_updated).substring(0,10);
    const ratio =((Number(data.locations[0].latest.deaths)/Number(data.locations[0].latest.confirmed))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2} );
    $('#data-covid').html(`
        <tr>
            <td id="quocgia">${CounTry}</td>
            <td>${Province || Default}</td>
            <td class="tong_canhiem">${Confirmed}</td>
            <td class="tong_tuvong">${Deaths}</td>
            <td>${Update}</td>
            <td>${ratio} %</td>
        </tr>
    `);
    $('#flag').html(`<img src="https://www.worldatlas.com/r/w425/img/flag/${CounTry_Code}-flag.jpg">`)
    $('#title-country').text(CounTry.toUpperCase());
    $('#total-cf').text(Confirmed );
    $('#total-dea').text(Deaths);
    $('#total-tl').text(`${((Number(Deaths)/Number(Confirmed))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2} )} %`);
   
};
//Hàm xuất dữ liệu covid toàn thế giới
async function CovidWorld(){
    const resp =await fetch (Apiurl2);
    const data = await resp.json();


    let canhiem =data.Global.TotalConfirmed;
    let tuvong = data.Global.TotalDeaths;
    let canhiemmoi =data.Global.NewConfirmed;
    let tuvongmoi = data.Global.NewDeaths;
    let phuchoi = new Intl.NumberFormat().format(data.Global.TotalRecovered);
    const World = document.getElementById('world');
    let coviddata="";

    $('#t_canhiem').text(`${formatCash(canhiem)}  || +${formatCash(canhiemmoi)}`);
    $('#t_tuvong').text(`${formatCash(tuvong)}  || +${formatCash(tuvongmoi)}`);
    $('#t_phuchoi').text(formatCash(phuchoi));


    data.Countries.forEach((covid) => {
        
        const CounTry = covid.Country;
        const CounTry_Code =  covid.CountryCode.toLowerCase();
        const Confirmed =new Intl.NumberFormat().format(covid.TotalConfirmed);
        const Deaths =new Intl.NumberFormat().format(covid.TotalDeaths);
        const NewConfirmed =new Intl.NumberFormat().format(covid.NewConfirmed);
        const NewDeaths =new Intl.NumberFormat().format(covid.NewDeaths);
        const Recovered =new Intl.NumberFormat().format(covid.TotalRecovered);
        const Update = moment(covid.Date).format('DD/MM/YYYY');
        
        coviddata +=`
        <div class="col-lg-3 col-md-6 col-sm-6" >
                <div class="country">
                    <div class="country-card">
                    
                        <div class="data-card">
                        <div class="country-flag"><div class="flag"><img src="https://www.worldatlas.com/r/w425/img/flag/${CounTry_Code}-flag.jpg"></div><h3>${CounTry}</h3></div>
                            <div class="row-data">
                                <div class="colum-data">
                                    <div class="name-value">Ca nhiễm</div>
                                    <div class="value" id="tong_canhiem">${Confirmed}</div>
                                </div>
                                <div class="colum-data">
                                    <div class="name-value">Ca nhiễm mới</div>
                                    <div class="value" id="tong_canhiem">+${NewConfirmed}</div>
                                </div>
                            </div>
                            <div class="row-data">
                                <div class="colum-data">
                                    <div class="name-value">Tử vong</div>
                                    <div class="value"><span id="tong_tuvong">${Deaths}</span></div>
                                </div>
                                <div class="colum-data">
                                    <div class="name-value">Tử vong mới</div>
                                    <div class="value" ><span id="tong_tuvong">+${NewDeaths}</span></div>
                                </div>
                            </div>
                            <div class="name-value">Hồi phục: <div id="tong_phuchoi">${Recovered}</div></div>
                            <div><p class="card-text"><small class="text-muted">Đã cập nhập ${Update}</small></p></div></li>
                        </div>
                        
                    </div>
                </div>
            </div>`;
    });
    $('#world').html(coviddata);  

   
       

    
};


CovidDefault();
CovidWorld();