import emailjs from '@emailjs/browser'

// EmailJS configuration
// Note: In a real application, these should be environment variables
const EMAILJS_CONFIG = {
  serviceId: 'your_service_id', // Replace with your EmailJS service ID
  templateId: 'your_template_id', // Replace with your EmailJS template ID
  publicKey: 'your_public_key', // Replace with your EmailJS public key
}

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey)

// Email service functions
export const emailService = {
  // Send email with attachment
  async sendEmailWithAttachment(templateParams, attachmentFile = null) {
    try {
      let result

      if (attachmentFile) {
        // Send email with attachment
        result = await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          ...templateParams,
          attachment: attachmentFile,
        })
      } else {
        // Send email without attachment
        result = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
        )
      }

      return { success: true, result }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Send contact form email
  async sendContactEmail(name, email, subject, message, attachmentFile = null) {
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    }

    return await this.sendEmailWithAttachment(templateParams, attachmentFile)
  },

  // Send newsletter subscription email
  async sendNewsletterEmail(email, firstName = '') {
    const templateParams = {
      to_email: email,
      to_name: firstName || 'Valued Member',
      subject: 'Welcome to Senior Connect Hub Newsletter',
      message: 'Thank you for subscribing to our newsletter!',
    }

    return await this.sendEmailWithAttachment(templateParams)
  },

  // Send event reminder email
  async sendEventReminder(email, eventName, eventDate, eventLocation) {
    const templateParams = {
      to_email: email,
      subject: `Reminder: ${eventName}`,
      event_name: eventName,
      event_date: eventDate,
      event_location: eventLocation,
      message: `This is a reminder for the upcoming event: ${eventName}`,
    }

    return await this.sendEmailWithAttachment(templateParams)
  },
}

export default emailService
