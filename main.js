let DATA;
let login = false;
function loding_data(){
    document.getElementById('text').textContent = DATA.values[0];
}

function makeApiCall() {
    var params = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '1R_6HAMwgHIZlqePXWrxi-CFR_xkq-0lKIK0BCbIGwdw', // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        range: 'Sheet1', // TODO: Update placeholder value.

        // How values should be represented in the output.
        // The default render option is ValueRenderOption.FORMATTED_VALUE.
       valueRenderOption: 'FORMATTED_VALUE', // TODO: Update placeholder value.

        // How dates, times, and durations should be represented in the output.
        // This is ignored if value_render_option is
        // FORMATTED_VALUE.
        // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
      //  dateTimeRenderOption: '', // TODO: Update placeholder value.
    };

    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        DATA = response.result;
        console.log("logined");
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function initClient() {
    var API_KEY = 'AIzaSyAZCRR8ktVWhoP6anJ7437edBqfnArREj8';
    var CLIENT_ID ="827615979425-9g76rj4vinmt3vgrojojfsdrft4g9q9g.apps.googleusercontent.com";
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
    gapi.client.init({'apiKey': API_KEY,'clientId': CLIENT_ID,'scope': SCOPE,'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],})
    .then(function() {
        // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        // login = gapi.auth2.getAuthInstance().isSignedIn.get();
        // updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        makeApiCall();
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        login = true;
        makeApiCall();
    }
}
function Recall() {
    makeApiCall();
    loding_data();
    // if (login) {
    //     makeApiCall();
    // }else{
    //     console.log("Now not login.")
    // }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    login = false;
}
