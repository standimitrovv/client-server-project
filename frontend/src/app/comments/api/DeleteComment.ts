export const removeComment = async (commentId: number) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API}/comments/${commentId}`, {
    method: 'DELETE',
  });
};
