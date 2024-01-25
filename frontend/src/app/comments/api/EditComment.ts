interface EditCommentRequestModel {
  id: number;
  text: string;
}

export const editCommentRequest = async (req: EditCommentRequestModel) =>
  await fetch(`${process.env.NEXT_PUBLIC_API}/comments`, {
    method: 'PUT',
    body: JSON.stringify(req),
    headers: {
      'Content-Type': 'application/json',
    },
  });
