document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const container = document.querySelector(".container");

  // Handle login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Perform login logic here
    // ...
  });

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    container.classList.toggle("dark-mode");
    darkModeToggle.classList.toggle("dark-mode");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const dataContainer = document.getElementById("table-container");
  const welcomeMessage = document.getElementById("welcome-message");
  const logoutButton = document.getElementById("logout-button");
  const loginForm = document.getElementById("login-form");

  const grid = document.querySelector(".grid");

  // Function to fetch data using Axios
  function fetchDataAndPopulateTable(data) {
    var options = {
      method: "POST",
      url: "https://inevent.com/api/",
      params: {
        action: "event.person.find",
        eventID: "79055",
        selection: "all",
      },
      headers: {
        Authorization:
          "Bearer $2a$08$ODY3MDU3NTgwNjQ5NTlkZOL96k4eFMgkiuCudd0kgDjK030bKpm/6",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data.data;
        console.log(data);
        data.forEach(function (person) {
          // Populate the data in the HTML grid container
          const personid = person.personID;
          const firstname = person.firstName;
          const lastname = person.lastName;
          const email = person.email;
          const locationcity = person.locationCity;
          const locationcountry = person.locationCountry;
          const personname = person.personName;
          const personusername = person.username;
          const enrollDate = person.enrollmentDate;

          const container = document.createElement("div");
          container.classList.add("container");
          container.innerHTML = `
              <p><b>PersonID: </b><span>${personid}</span></p>
              <p><b>Firstname: </b><span>${firstname}</span></p>
              <p><b>Lastname: </b><span>${lastname}</span></p>
              <p><b>Email: </b><span>${email}</span></p>
              <p><b>City: </b><span>${locationcity}</span></p>
              <p><b>Country: </b><span>${locationcountry}</span></p>
              <p><b>Person Name: </b><span>${personname}</span></p>
              <p><b>Username: </b><span>${personusername}</span></p>
              <p><b>Enroll Date: </b><span>${enrollDate}</span></p>
            `;

          grid.appendChild(container);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    // User is logged in, show data container and retrieve user information
    const username = localStorage.getItem("username");
    loginContainer.style.display = "none";
    dataContainer.style.display = "block";
    logoutButton.style.display = "block";
    welcomeMessage.innerText = `Welcome, ${username}!`;
    // Retrieve data and populate the data table
    fetchDataAndPopulateTable();
  } else {
    // User is not logged in, show login container
    loginContainer.style.display = "block";
    dataContainer.style.display = "none";
    logoutButton.style.display = "none";
  }

  // Handle login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    var options = {
      method: "POST",
      url: "https://inevent.com/api/",
      params: {
        action: "person.signIn",
        username: username,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        password: password,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // Handle successful login response and show/hide appropriate elements
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        var options = {
          method: "POST",
          url: "https://inevent.com/api/",
          params: {
            action: "event.person.find",
            eventID: "79055",
            selection: "all",
          },
          headers: {
            Authorization:
              "Bearer $2a$08$ODY3MDU3NTgwNjQ5NTlkZOL96k4eFMgkiuCudd0kgDjK030bKpm/6",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        axios
          .request(options)
          .then(function (response) {
            const data = response.data.data;
            console.log(data);
            data.forEach(function (person) {
              const personid = person.personID;
              const firstname = person.firstName;
              const lastname = person.lastName;
              const email = person.email;
              const locationcity = person.locationCity;
              const locationcountry = person.locationCountry;
              const personname = person.personName;
              const personusername = person.username;
              const enrollDate = person.enrollmentDate;

              const container = document.createElement("div");
              container.classList.add("container");
              container.innerHTML = `
              <p><b>PersonID: </b><span>${personid}</span></p>
              <p><b>Firstname: </b><span>${firstname}</span></p>
              <p><b>Lastname: </b><span>${lastname}</span></p>
              <p><b>Email: </b><span>${email}</span></p>
              <p><b>City: </b><span>${locationcity}</span></p>
              <p><b>Country: </b><span>${locationcountry}</span></p>
              <p><b>Person Name: </b><span>${personname}</span></p>
              <p><b>Username: </b><span>${personusername}</span></p>
              <p><b>Enroll Date: </b><span>${enrollDate}</span></p>
            `;

              grid.appendChild(container);
            });
          })
          .catch(function (error) {
            console.error(error);
          });
        // Handle successful login response and show/hide appropriate elements
        loginContainer.style.display = "none";
        dataContainer.style.display = "block";
        logoutButton.style.display = "block";
        welcomeMessage.innerText = `Welcome, ${username}!`;
        // Populate data table with response data
        // dataTableBody.innerHTML = ...;
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  // Handle logout button click
  logoutButton.addEventListener("click", () => {
    // Clear the stored token from localStorage or sessionStorage
    // localStorage.removeItem('token');
    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    // Show the login form and hide the data table
    loginContainer.style.display = "block";
    dataContainer.style.display = "none";
    logoutButton.style.display = "none";
    location.reload();
  });
});
