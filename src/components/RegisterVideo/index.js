import { StyledRegisterVideo } from "./styles";
import React from "react";
import { createClient } from "@supabase/supabase-js";

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

const PROJECT_URL = "https://vqlirfynkudkhuyqzsop.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxbGlyZnlua3Vka2h1eXF6c29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTkxMzUsImV4cCI6MTk4Mzc3NTEzNX0.6GYqITqMnelZUY-S035HrfHT3_8f0HTvvcSO68NU2uM"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}hdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {titulo:"Frost Punk", url:"https://www.youtube.com/watch?v=QsqatJxAUtk" }
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

            supabase.from("video").insert({
              title: formCadastro.values.titulo,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "jogos",
            }).then((oqueveio) => {
              console.log(oqueveio)
            }).catch((err) => {
              console.log(err)
            })

            // setFormVisivel(false);
            // formCadastro.clearForm();
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
