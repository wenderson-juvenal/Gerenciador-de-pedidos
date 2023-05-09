const form = document.querySelector('#add-ingrediente')

form.addEventListener('submit', (event) => {
	event.preventDefault()

	const formData = new FormData(form)
	const jsonData = {};

	for (let [key, value] of formData.entries()) {
		jsonData[key] = value;
	}
	fetch('/ingredientes/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonData)
		})
		.then(res => res.text())
		.then(data => {
			try {
				let obj = JSON.parse(data)
				alert(obj.aviso)
			} catch {
				return
			}
		})
	window.location.reload();
})

// evento no botao adicionar 
let button = document.querySelector(".pageHeader > button")


button.addEventListener("click", () => {
	let div = document.querySelector('.addConteudo')
	let efect = document.querySelector('.opacidade')

	efect.addEventListener("click", () => {
		div.style.display = 'none'
		efect.style.display = 'none'
	})
	div.style.display = 'flex'
	efect.style.display = 'block'
})

// evento ingrediente edit e delete

let icons = document.querySelectorAll(".ingrediente div img")
icons.forEach(icon => {
	icon.addEventListener("click", () => {
		let editForm = document.querySelector(`img[nome='${icon.getAttribute("nome")}'] + form[action="/ingredientes/edit"]`)
		let deleteForm = document.querySelector(`img[nome='${icon.getAttribute("nome")}'] + form[action="/ingredientes/delete"]`)
		let efect = document.querySelector('.opacidade')

		// clicar fora da tela fecha o form
		efect.addEventListener("click", () => {
			editForm.style.display = 'none'
			deleteForm.style.display = 'none'
			efect.style.display = 'none'
		})

		efect.style.display = 'block'
		
		// botão de delete fecha o form
		deleteForm.querySelector("button").addEventListener("click", (e) => {
			e.preventDefault()
			editForm.style.display = 'none'
			deleteForm.style.display = 'none'
			efect.style.display = 'none'
		})

		if (icon.getAttribute("alt")=="editar") {
			editForm.style.display = "flex"
		} else {
			deleteForm.style.display = "flex"
		}

	})
})
