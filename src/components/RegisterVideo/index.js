import { StyledRegisterVideo } from "./styles";
import React from "react";

function useForm(props) {
  const [values, setValues] = React.useState(props.initialValues);

  return {
    values,
    handleChange: (e) => {
        const value = e.target.value;
        const name = e.target.name
        setValues({
          ...values,
          [name]: value,
        });
      },
      clearForm() {
        setValues({})
      }
    }
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {titulo:"Frost Punk", url:"https://youtube..." }
  });
  const [formVisivel, setFormVisivel] = React.useState(true);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              className="close-modal"
              type="button"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do video"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
