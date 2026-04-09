document.getElementById('ai-send').addEventListener('click', async () => {
  const input = document.getElementById('ai-input').value;
  if (!input) return alert('Type a question first!');
  const outputDiv = document.getElementById('ai-output');
  outputDiv.innerHTML = 'Processing...';
  try {
    const response = await fetch('/ai-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: input })
    });
    const data = await response.json();
    outputDiv.innerHTML = data.response;
  } catch (err) {
    outputDiv.innerHTML = 'Error: Could not reach AI service.';
    console.error(err);
  }
});
