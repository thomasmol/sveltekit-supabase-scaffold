# SvelteKit + Supabase Scaffold

This is is a scaffold/template for your SvelteKit project that uses Supabase as a backend.
[Supabase](https://supabase.com/) is an open-source Backend-as-a-Service, an alternative to Firebase. 

This scaffold is made to get you started quickly with your SvelteKit app that uses Supabase as a backend. Stop wasting time setting up authentication pages, profile pages and localization (soon) by using this template! 

## ⚡️ Features
* Uses TailwindCSS 3 for styling
* Prettier and eslint for code formatting
* User accounts with password-based authentication
* Logging in and registration of new users 
* Password reset
* User profiles with first name, last name and avatar
* Dark mode 
* Localization out of the box (soon)
* Welcome page and home page to start your app
* Protected pages with built-in redirect (soon)
* Typed functions (soon)
* Easily deployed on Vercel and Netlify with the auto adapter


## 🛠 How to use
### Setting up Supabase project
1. Create a new Supabase project on https://app.supabase.io

2. Run these SQL commands to setup the database:

You can run and save these SQL scripts in the SQL editor in your Supabase project.

#### 👤 Set up the profile table, add columns any columns you need
```sql
CREATE TABLE public.profiles (
    id uuid REFERENCES auth.users NOT NULL,
    first_name varchar(255),
    last_name varchar(255),
    avatar_url varchar(255),    
    created_at timestamp(0) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT now() NOT NULL,
    primary key (id)
);
```

#### 🪣 Set up a storage bucket for the profile avatar/picture
```sql 
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );
```

#### 🔒 Set up Row Level Security (RLS) for the profiles table
```sql
ALTER TABLE
  public.profiles ENABLE ROW LEVEL SECURITY;

create policy "Public profiles are viewable by every authenticated user." on profiles for
select
  using (auth.role() = 'authenticated');

create policy "Users can insert their own profile." on profiles for
insert
  with check (auth.uid() = id);

create policy "Users can update own profile." on profiles for
update
  using (auth.uid() = id);
```

#### 🔁 Set up realtime
```sql
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;
```

3. Go to your project settings and add ```http://localhost:3000/passwordreset``` to the Additional Redirect URLs (change localhost:3000 with whatever domain you are going to use, localhost is just for dev)

### Setup SvelteKit Project

1. Create new project based on this template with degit:
```bash
npx degit ThomasMol/sveltekit-supabase-scaffold sveltekit-app
 ```
2. Run 
```bash 
npm install
```

3. Setup your .env file

Change the filename of ```.env.example``` to ```.env``` (or create one).
In your Supabase project go to ```settings > API ```, and copy the ```anon public``` key and paste it in the ```.env``` file as the `SUPABASE_ANON_KEY` environment variable. Copy your Supabase ```URL``` and paste it in the ```.env``` file as well, as the `SUPABASE_URL` environment variable.

4. Run your SvelteKit app
```bash
npm run dev
```

## Building

(Taken from Sveltejs documentation)

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## ⚙️ Configuration

Nothing here much. Tailwind config is up to the you.

## 📦 Package dependencies

This scaffold depends on several third party packages:

* [tailwindcss](https://tailwindcss.com/)
  * CSS framework
* [TypeScript](https://www.typescriptlang.org/)
* [supabase_js](https://github.com/supabase/supabase-js)
  * For Supabase support

## 👨‍💻 About author

My [website](https://thomasmol.com)

My [Twitter](https://twitter.com/thomas_a_mol)