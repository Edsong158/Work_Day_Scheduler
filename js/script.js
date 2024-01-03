$(function () {

  function updateCurrentDateTime() {
    var currentDate = dayjs();
    var currentHour = currentDate.hour();
    var formattedDateTime = currentDate.format('MMMM D, YYYY [at] h:mm A');
    document.getElementById('currentDateTime').innerText = formattedDateTime;

    for (let hour = 9; hour <= 6; hour++) {
      var timeBlockDiv = $(`#hour-${hour}`);
      
      if (timeBlockDiv.length) {
        var timeBlockClass = hour < currentHour ? 'past' : hour === currentHour ? 'present' : 'future';
        
        timeBlockDiv.removeClass('past present future').addClass(timeBlockClass);
      }
    }
  }

  function loadUserInput() {
    // Adjust the loop range to match your HTML structure (hour-9 to hour-6)
    for (let hour = 9; hour <= 16; hour++) {
      var timeBlockDiv = $(`#hour-${hour}`);
      var userInput = localStorage.getItem(`hour-${hour}`);

      if (timeBlockDiv.length && userInput !== null) {
        timeBlockDiv.find('.description').val(userInput);
      }
    }
  }

  $('.saveBtn').on('click', function () {
    var timeBlock = $(this).closest('.time-block');
    var timeBlockId = timeBlock.attr('id');
    var userInput = timeBlock.find('.description').val();

    localStorage.setItem(timeBlockId, userInput);
  });

  updateCurrentDateTime();
  loadUserInput();

  setInterval(updateCurrentDateTime, 60000);
});

