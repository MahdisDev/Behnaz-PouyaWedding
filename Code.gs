function doGet() {
  return HtmlService.createHtmlOutput(
	"Wedding RSVP service is ready. Submit the RSVP form from the wedding website."
  );
}

function doPost(e) {
  var name = e.parameter.name || "Not provided";
  var email = e.parameter.email || "Not provided";
  var attendance = e.parameter.attendance || "Not provided";
  var isAttending = attendance === "Yes, I will attend";
  var message = isAttending
	? "We are delighted that you will be joining us to celebrate our special day."
	: "Thank you for letting us know. We are sorry you will not be able to join us, and we will be thinking of you.";
	var hostMessage = isAttending
	? "This guest has confirmed that they will attend the wedding."
	: "This guest has told you that they cannot attend the wedding.";
  var safeName = escapeHtml(name);
  var safeEmail = escapeHtml(email);
  var safeAttendance = escapeHtml(attendance);
	var emailBody = "A new wedding RSVP has been received.\n\n"
	+ "Guest name: " + name + "\n"
	+ "Guest email: " + email + "\n"
	+ "Attendance: " + attendance + "\n\n"
	+ hostMessage;
  var htmlBody = "<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#4a3b32;background:#fffaf6;padding:32px;border-radius:16px'>"
	+ "<h1 style='color:#c08552;text-align:center;margin-top:0'>New Wedding RSVP</h1>"
	+ "<p style='font-size:18px'>A guest has responded to your wedding invitation.</p>"
	+ "<div style='background:#ffffff;padding:20px;border-radius:12px;border:1px solid #f0dfd2'>"
	+ "<p><strong>Guest name:</strong> " + safeName + "</p>"
	+ "<p><strong>Guest email:</strong> " + safeEmail + "</p>"
	+ "<p><strong>Attendance:</strong> " + safeAttendance + "</p>"
	+ "</div>"
	+ "<p style='font-size:16px;line-height:1.6;margin-bottom:0'>" + escapeHtml(hostMessage) + "</p>"
	+ "</div>";

  MailApp.sendEmail({
	to: "mahdiszakeri@yahoo.co.uk; mahdiszak@gmail.com;",
	subject: "New Wedding RSVP - " + attendance,
	body: emailBody,
	htmlBody: htmlBody
  });

  return HtmlService.createHtmlOutput(
	"<div style='font-family:Arial,sans-serif;text-align:center;padding:40px;color:#4a3b32'>"
	+ "<h2 style='color:#c08552'>Thank you, " + safeName + "!</h2>"
	+ "<p>" + escapeHtml(message) + "</p>"
	+ "</div>"
  );
}

function escapeHtml(value) {
  return String(value)
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/\"/g, "&quot;")
	.replace(/'/g, "&#039;");
}
