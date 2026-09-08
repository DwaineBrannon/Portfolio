export default function ContactPage() {
	return (
		<main>
			<h1>Contact</h1>
			<p>Get in touch.</p>

			<form>
				<label htmlFor="name">Name</label>
				<input id="name" name="name" type="text" required />

				<label htmlFor="email">Email</label>
				<input id="email" name="email" type="email" required />

				<label htmlFor="message">Message</label>
				<textarea id="message" name="message" rows="6" required />

				<button type="submit">Send message</button>
			</form>
		</main>
	);
}
