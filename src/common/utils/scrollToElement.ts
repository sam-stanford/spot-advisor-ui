export default function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element !== null) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth',
    });
  }
}
