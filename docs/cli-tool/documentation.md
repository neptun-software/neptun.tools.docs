# Neptun CLI

Neptun is a Python-based CLI for interacting with Neptun AI via the Neptun API interface. It is designed to answer questions on DevOps, Docker, Docker Compose, and more.

## Features

- Rich command-line interface using [Typer](https://typer.tiangolo.com/)
- Styled output using [Rich](https://github.com/Textualize/rich)
- Interactive prompts via [Questionary](https://github.com/tmbo/questionary)
- Seamless authentication and configuration management
- Integration with GitHub and template collections

## Installation

You can install Neptun via pip:

```sh
pip install neptun
```

## Usage

Once installed, you can access Neptun using the `neptun` command.

```sh
neptun --help
```

## Available Commands

### General Options

```
--install-completion    Install completion for the current shell.
--show-completion      Show completion for the current shell.
--help                 Show this message and exit.
```

### Core Commands

| Command      | Description |
|-------------|-------------|
| `config`    | Manage general settings for the application. |
| `auth`      | Connect to the Neptun web client. |
| `assistant` | Chat with the Neptun chatbot. |
| `collection` | Manage your Neptun collections. |
| `github`    | Manage imported repositories & use the Neptun GitHub application. |
| `info`      | Display the current status and version of Neptun. |
| `open`      | Open the Neptun web interface. |
| `health`    | Check the status of the Neptun API. |
| `template`  | Manage templates in your collections. |
| `project`   | Create and manage Neptun projects. |

## Command Details

### `neptun config`

Manage and configure general settings:

```
neptun config --help
```

#### Subcommands:

- `dynamic` - Edit app settings dynamically.
- `fallback` - Reset to default settings.
- `session-token` - Update authentication token.
- `init` - Initialize configuration from the web UI.
- `status` - Get current configuration and user details.

### `neptun auth`

Authenticate with Neptun:
```
neptun auth --help
```

#### Subcommands:

- `login` - Log into your Neptun account.
- `register` - Create a new Neptun account.
- `status` - View authentication status.
- `send-otp` - Send a one-time password.
- `reset-password` - Reset password using OTP.

### `neptun assistant`

Chat with Neptun AI:
```
neptun assistant --help
```

#### Subcommands:

- `options` - List available options.
- `list` - Show chat dialogs.
- `enter` - Enter a chat dialog.
- `delete` - Remove a chat dialog.
- `create` - Start a new chat dialog.
- `select` - Select an active chat dialog.
- `update` - Modify an existing chat.
- `ask` - Ask a question.

### `neptun collection`

Manage collections:
```
neptun collection --help
```

#### Subcommands:

- `options` - List available template options.
- `create-empty` - Create a new empty collection.
- `list` - Show existing collections.
- `list-shared` - Show shared collections.
- `delete` - Remove a collection.
- `update` - Modify a collection.
- `inspect` - View collection details.
- `create` - Generate a collection from local files.
- `pull` - Download a collection from Neptun.

### `neptun github`

Manage GitHub integrations:
```
neptun github --help
```

#### Subcommands:

- `install` - Install the Neptun GitHub app on a repository.
- `list-imports` - View imported repositories.
- `uninstall` - Remove the Neptun GitHub app.

### `neptun template`

Manage templates:
```
neptun template --help
```

#### Subcommands:

- `delete` - Remove a template from a collection.

### `neptun project`

Work with Neptun projects:
```
neptun project --help
```

#### Subcommands:

- `create` - Start a new Neptun project.

---

## License

This project is licensed under **The Unlicense**.

## Authors

- **stevan06v**
- **jonasfroeller**

For more details, visit [Neptun's official repository](https://github.com/your-repo-link).
