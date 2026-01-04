export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedMinutes} : ${formattedSeconds}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getStoredExpiryTime(STORAGE_KEY) {
  const storedTime = localStorage.getItem(STORAGE_KEY);
  return storedTime ? parseInt(storedTime, 10) : null;
}

export function calculateSecondsLeft(expiryTime) {
  if (!expiryTime) return 0;
  const now = Date.now();
  const secondsLeft = Math.ceil((expiryTime - now) / 1000);
  return secondsLeft > 0 ? secondsLeft : 0;
}
