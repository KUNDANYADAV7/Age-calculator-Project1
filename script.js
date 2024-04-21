document
  .getElementById("ageCalculatorForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    calculateAge();
  });

function calculateAge() {
  var dob = new Date(document.getElementById("dob").value);
  var targetDate = new Date(document.getElementById("targetDate").value);
  var age = {};
  var age2 = {};

  age.years = targetDate.getFullYear() - dob.getFullYear();
  var monthDiff = targetDate.getMonth() - dob.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && targetDate.getDate() < dob.getDate())
  ) {
    age.years--;
  }

  age.months = targetDate.getMonth() - dob.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && targetDate.getDate() < dob.getDate())
  ) {
    age.months = 12 + monthDiff;
  }

  age2.months =
    (targetDate.getFullYear() - dob.getFullYear()) * 12 +
    targetDate.getMonth() -
    dob.getMonth();

  if (targetDate.getDate() < dob.getDate()) {
    age2.months--;
  }

  var oneDay = 24 * 60 * 60 * 1000;
  var dobTimestamp = dob.getTime();
  var targetTimestamp = targetDate.getTime();
  var totalDays = Math.round(
    Math.abs((targetTimestamp - dobTimestamp) / oneDay)
  );

  age.days = targetDate.getDate() - dob.getDate();
  if (age.days < 0) {
    var prevMonthDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() - 1,
      0
    );
    var daysInPrevMonth = prevMonthDate.getDate();
    age.days = daysInPrevMonth - dob.getDate() + targetDate.getDate();
    age.months--;
  }

  age2.weeks = Math.floor(totalDays / 7);

  var remainingDays = totalDays % 7;

  var hours = (targetDate - dob) / (1000 * 60 * 60);
  age.hours = Math.floor(hours);

  var minutes = (targetDate - dob) / (1000 * 60);
  age.minutes = Math.floor(minutes);

  var seconds = (targetDate - dob) / 1000;
  age.seconds = Math.floor(seconds);

  var result = "<center><strong>Age</strong></center><br>";
  result +=
    age.years + " years " + age.months + " months " + age.days + " days<br>";
  result += "or " + age2.months + " months " + age.days + " days<br>";
  result += "or " + age2.weeks + " weeks " + remainingDays + " days<br>";
  result += "or " + totalDays.toLocaleString() + " days<br>";
  result += "or " + age.hours.toLocaleString() + " hours<br>";
  result += "or " + age.minutes.toLocaleString() + " minutes<br>";
  result += "or " + age.seconds.toLocaleString() + " seconds<br>";

  document.getElementById("result").innerHTML = result;
  document.querySelector(".container").style.display = "flex";
  document.querySelector(".containers").style.display = "block";

  displayCalendar(
    "dobCalendar",
    dob.getFullYear(),
    dob.getMonth() + 1,
    dob.getDate(),
    "dob"
  );
  displayCalendar(
    "targetDateCalendar",
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    targetDate.getDate(),
    "targetDate"
  );
}

function displayCalendar(
  elementId,
  year,
  month,
  highlightDate,
  highlightClass
) {
  var calendarDiv = document.getElementById(elementId);
  var calendar =
    "<center><strong>" +
    monthName(month) +
    " " +
    year +
    "</strong></center><br>";
  calendar += "<table border='1'>";
  calendar +=
    "<tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>";

  var firstDay = new Date(year, month - 1, 1).getDay();
  var daysInMonth = new Date(year, month, 0).getDate();

  var day = 1;
  for (var i = 0; i < 6; i++) {
    calendar +=
      "<tr style='background-color: " +
      (i % 2 === 0 ? "#FBEFEF" : "white") +
      ";'>";
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        calendar += "<td></td>";
      } else if (day > daysInMonth) {
        calendar += "<td></td>";
      } else {
        var cellClass = "";
        if (day === highlightDate) {
          cellClass = highlightClass;
        }
        calendar += "<td class='" + cellClass + "'>" + day + "</td>";
        day++;
      }
    }
    calendar += "</tr>";
  }

  calendar += "</table>";
  calendarDiv.innerHTML = calendar;
}

function monthName(month) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
}
