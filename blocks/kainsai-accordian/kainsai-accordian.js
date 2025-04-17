export default function decorate(block) {
    const QuestionSets = block.children;
  
    Array.from(QuestionSets).forEach((set) => {
      const titleElement = set.querySelector('div > p');
      if (titleElement) {
        const baseClass = titleElement.textContent
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-');
  
        set.classList.add(`accordion-${baseClass}`);
        set.classList.add(`question-set`);
      }
    });
}
