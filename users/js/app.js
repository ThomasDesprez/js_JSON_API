let myHeaders = new Headers();
const token = 'pk.eyJ1IjoiZGVzcHJlenRob21hcyIsImEiOiJjazg3ZHAwcWgwbXVtM2dvOGR4anl6NDN2In0.5xEDlVkoHJJm-m-NtIwBYg';

let fetchOptions = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

const fetchuser = () => {
    fetch("https://jsonplaceholder.typicode.com/users", fetchOptions)
        .then(resp => resp.text())
        .then(users => {
            users = JSON.parse(users);
            users.forEach((user) => {


                document.body.insertAdjacentHTML("beforeend",
                    create_user_html(user.name, user.address, user.id, user.username, user.email, user.phone, user.website, user.company));
                console.log(parseFloat(user.address.geo.lat) + " : " + parseFloat(user.address.geo.lng));

                var mymap = L.map('mapid_' + user.id).setView([29.452, -164.29], 13);

                // var mymap = L.map('mapid_' + user.id).setView([parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)], 13);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: token
                }).addTo(mymap);
            })
        })
        .catch(erreur => {
            console.error(erreur);
        });
};

// fetchuser();

function create_user_html(name, address, id, username, email, phone, website, company) {
    return `<div class="card">
    <div class="banner"></div>
<h1 id="name">` + name + `</h1>
<p id="location">` + format_address(address.city, address.suite, address.street, address.zipcode) + `</p>
<div id="infos">
<table class="user_info">
    <tbody>
        <tr>
            <th>ID</th>
            <td>` + id + `</td> 
        </tr>
        <tr>
            <th>Username</th>
            <td>` + username + `</td>
        </tr>

        <tr>
            <th>email</th>
            <td>` + email + `</td>
        </tr>

        <tr>
            <th>Phone</th>
            <td>` + phone + `</td>
        </tr>
        <tr>
            <th>Website</th>
            <td>` + website + `</td>
        </tr>
        <tr>
            <th>Company</th>
            <td>` + company.name + `</td>
        </tr>
    </tbody>
</table>
</div>
<div class="map" id="mapid_` + id + `"></div>
</div>`;
}


const fetchcomms = () => {
    var startTime = new Date().getTime();
    console.log(new Date().getTime());
    var elapsedTime = 0;

    fetch("https://jsonplaceholder.typicode.com/comments", fetchOptions)
        .then(resp => resp.text())
        .then(comms => {
            comms = JSON.parse(comms);
            console.log("OK");
            comms.forEach((comm) => {
                document.body.insertAdjacentHTML("beforeend",
                    create_comms_html(comm.postId, comm.id, comm.name, comm.email, comm.body));
            })
            elapsedTime = new Date().getTime() - startTime;

            console.log(elapsedTime);
        })
        .catch(erreur => {
            console.error(erreur);
        });


};


function create_comms_html(postId, id, name, email, body) {
    return `<div class="card">
<div id="infos">
<table class="user_info">
    <tbody>
        <tr>
            <th>postID</th>
            <td>` + postId + `</td> 
        </tr>
        <tr>
            <th>id</th>
            <td>` + id + `</td>
        </tr>

        <tr>
            <th>name</th>
            <td>` + name + `</td>
        </tr>

        <tr>
            <th>email</th>
            <td>` + email + `</td>
        </tr>
        <tr>
        <th>body</th>
        <td>` + body + `</td>
    </tr>
    </tbody>
</table>
</div>
</div>`;
}

fetchuser();

function format_address(city, suite, street, zipcode) {
    return `${city}, ${suite} ${street} (${zipcode})`;
}