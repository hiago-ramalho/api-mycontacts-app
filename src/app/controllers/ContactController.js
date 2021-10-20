const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // para obter UM registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: not found
      return response.status(404).json({ error: 'Contact Not Found.' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // para criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({ error: 'This email is already in use.' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    // para editar um reistro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found.' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This email is already in use.' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // para deletr um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // sendStatus -> manda o status code sem nenhum body/mensagem
    response.sendStatus(204);
    // 204 -> no content
  }
}

module.exports = new ContactController();
