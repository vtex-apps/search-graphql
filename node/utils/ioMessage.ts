
export const toSearchTerm = (
  term: string,
  from: string,
  to: string,
  description?: string
) => ({
  messages: [
    {
      content: term,
      context: description
    },
  ],
  from,
  to,
})
