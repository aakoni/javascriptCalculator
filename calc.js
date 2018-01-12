$(document).ready(function() {

  var entry = '';
  var answer = '';
  var current = '';
  var log = '';
  var decimal = true;
  var reset = '';

  // Rounding if a decimal is included
  function round(val) {
    val = val.toString().split('');
    if (val.indexOf('.') !== -1) {
      var valTest = val.slice(val.indexOf('.') + 1, val.length);
      val = val.slice(0, val.indexOf('.') + 1);
      var i = 0;
      while (valTest[i] < 1) {
        i++
      }
      valTest = valTest.join('').slice(0, i + 2);
      if (valTest[valTest.length-1] === '0') {
        valTest = valTest.slice(0, -1);
      }
      return val.join('') + valTest;
    } else {
      return val.join('');
    }
  }

  $('button').click(function() {
    entry = $(this).attr("value");
    
    //Reset log
    if (reset) {
      if (entry === '/' || entry === '*' || entry === '-' || entry === '+') {
        log = display;
      } else {
        display = '';
      }
    }
    reset = false;

    // Clear all
    if (entry === 'clear') {
      answer = '';
      current = '';
      entry = '';
      log = '';
      $('#answer').html('0');
      decimal = true;
    }

    // One decimal only
    if (entry === '.' || entry === '0.') {
      if (!decimal) {
        entry = '';
      }
    }
    
    // Restrict first digit
    if (answer.length === 0 && isNaN(entry) && entry !== '.' || answer.length === 0 && entry === '0') {
      entry = '';
      answer = '';
    }

    // Restrict extra operators
    if (current !== 'noChange') {
      if (current === '' && isNaN(entry) && entry !== '.' || isNaN(current) && isNaN(entry) && entry !== '.') {
        entry = '';
      }
    }

    // Combine digits
    while (Number(entry) || entry === '0' || current === '.') {

      if (isNaN(current) && entry === '0' && current !== '.') {
        entry = '';
      } else if (isNaN(current) && Number(entry) && current !== '.') {
        current = '';
      }
      if (entry === '.') {
        decimal = false;
      }
      if (current === '0.' && isNaN(entry)) {
        entry = '';
      } else {
        if (current[current.length - 1] === '.') {
          current = current.concat(entry);
        } else {
          current += entry;
        }
        answer += entry;
        $('#answer').html(current);
        log += entry;
        entry = '';
      }
    }

    // Calculations
    if (entry === '.') {
      if (current === '' || isNaN(current[current.length - 1])) {
        current = '0.';
        answer += entry;
        $('#answer').html('0.');
        log += current;
      } else {
        current = current.concat('.');
        answer = answer.concat('.');
        log = answer;
        $('#answer').html(current);
      }
      entry = '';
      decimal = false;
    } else if (entry === '/') {
      current = '/';
      answer = round(eval(answer)) + current;
      log += current;
      $('#answer').html('/');
      entry = '';
      decimal = true;
    } else if (entry === '*') {
      current = '*';
      answer = round(eval(answer)) + current;
      log += current;
      $('#answer').html('x');
      entry = '';
      decimal = true;
    } else if (entry === '-') {
      current = '-';
      answer = round(eval(answer)) + current;
      log += current;
      $('#answer').html('-');
      entry = '';
      decimal = true;

    } else if (entry === '+') {
      current = '+';
      answer = round(eval(answer)) + current;
      log += current;
      $('#answer').html('+');
      entry = '';
      decimal = true;

    } else if (entry === '=') {
      if (current[current.length - 1] === '.') {
        entry = '';
      } else {
        current = eval(answer).toString();
        $('#answer').html(round(eval(answer)));
        answer = round(eval(answer));
        log += entry + answer;
        log = answer;
        entry = '';
        reset = true;
        decimal = true;
      }
      current = 'noChange';
    }
    entry = '';

    if (reset) {
      log = '';
    }

    // Max digits
    if ($('#entry').children().text().length > 8) {
      $('#answer').html('0');
      current = '';
      answer = '';
      log = '';
      decimal = true;
    }
  });
});   