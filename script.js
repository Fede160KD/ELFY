document.addEventListener("DOMContentLoaded", cargarPublicaciones);

function agregarPublicacion() {
    let titulo = document.getElementById("titulo").value.trim();
    let contenido = document.getElementById("contenido").value.trim();
    let imagenInput = document.getElementById("imagenInput").files[0];

    if (!titulo || !contenido) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let nuevaPublicacion = {
        id: Date.now(),
        titulo: titulo,
        contenido: contenido,
        imagen: imagenInput ? URL.createObjectURL(imagenInput) : "",
        likes: 0
    };

    let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
    publicaciones.push(nuevaPublicacion);
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

    mostrarPublicacion(nuevaPublicacion);

    // Limpiar los campos
    document.getElementById("titulo").value = "";
    document.getElementById("contenido").value = "";
    document.getElementById("imagenInput").value = "";
}

function mostrarPublicacion(post) {
    let blog = document.getElementById("blog");

    let nuevoPost = document.createElement("div");
    nuevoPost.classList.add("post");
    nuevoPost.dataset.id = post.id; // Guardamos el ID en el elemento HTML

    if (post.imagen) {
        let imgElement = document.createElement("img");
        imgElement.src = post.imagen;
        imgElement.alt = "Imagen subida";
        nuevoPost.appendChild(imgElement);
    }

    let h3 = document.createElement("h3");
    h3.textContent = post.titulo;

    let p = document.createElement("p");
    p.textContent = post.contenido.length > 100 ? post.contenido.substring(0, 100) + "..." : post.contenido;

    let likeBtn = document.createElement("button");
    likeBtn.textContent = `❤️ ${post.likes}`;
    likeBtn.classList.add("btn", "like-btn");
    likeBtn.onclick = function () {
        darLike(post.id, likeBtn);
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Eliminar";
    deleteBtn.classList.add("btn", "delete-btn");
    deleteBtn.onclick = function () {
        eliminarPost(post.id, nuevoPost);
    };

    nuevoPost.appendChild(h3);
    nuevoPost.appendChild(p);
    nuevoPost.appendChild(likeBtn);
    nuevoPost.appendChild(deleteBtn);

    blog.appendChild(nuevoPost);
}

function cargarPublicaciones() {
    let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
    publicaciones.forEach(mostrarPublicacion);
}

function eliminarPost(id, elemento) {
    let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
    publicaciones = publicaciones.filter(post => post.id !== id);
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
    elemento.remove();
}

function darLike(id, boton) {
    let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
    let post = publicaciones.find(post => post.id === id);
    if (post) {
        post.likes++;
        localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
        boton.textContent = `❤️ ${post.likes}`;
    }
}

                