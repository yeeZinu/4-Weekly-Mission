export function showError(input, message) {
  const errorDiv = input.nextElementSibling;
  const errorInput = input;
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--Linkbrary-red, #FF5B56)';
  errorDiv.style.fontFamily = 'Pretendard';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.paddingTop = '0.38rem';
  errorInput.style.border = '1px solid var(--Linkbrary-red, #FF5B56)';
}

export function hideError(input) {
  const errorDiv = input.nextElementSibling;
  const errorInput = input;
  errorDiv.textContent = '';
  errorInput.style.border = '1px solid var(--Linkbrary-gray20, var(--gray-3))';
}

export function pathTo(pth) {
  window.location.href = `/${pth}`;
}
