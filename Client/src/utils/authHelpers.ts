export const checkValidEmail = async (
  e: React.FormEvent<HTMLFormElement>,
) => {
  e.preventDefault();
  return new Promise ((resolve,reject)=>{

  const email = e.target.email.value;
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const result = emailRegex.test(email);
  if(result) resolve(email)
    else reject()
  })
};

