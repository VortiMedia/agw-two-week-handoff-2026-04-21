type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: ReadonlyArray<FaqItem> }) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="faq-item site-card rounded-[1.75rem]"
          open={index === 0}
        >
          <summary className="faq-summary">
            <span>{item.question}</span>
            <span className="faq-plus">+</span>
          </summary>
          <p className="faq-answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
