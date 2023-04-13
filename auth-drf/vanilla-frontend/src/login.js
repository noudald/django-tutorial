/* Login Javascript template */

document
  .getElementById('formLogin')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Prevent doing anything');
  });

document
  .getElementById('inputLogin')
  .addEventListener('click', () => {
    console.log('click')
  });

console.log('Login script ran');
