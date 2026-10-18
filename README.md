# SEG3502 — Laboratoire 5 — Code de départ

Ce dossier contient l'application **Employee** de départ pour le laboratoire 5.

## Démarrage

Dans un terminal ouvert à la racine du projet :

```bash
npm install
npm start
```

Puis ouvrez l'application à l'adresse indiquée par Angular, normalement :

```text
http://localhost:4200/
```

## Firebase / AngularFire

Ce projet utilise **Angular 18**. Pour ce laboratoire, utilisez la version AngularFire compatible avec cette version d'Angular :

```bash
ng add @angular/fire@18.0.1
```

Pendant la configuration, sélectionnez **Firestore** et votre propre projet Firebase.

> N'utilisez pas simplement `ng add @angular/fire` sans version : la version la plus récente d'AngularFire peut cibler une version plus récente d'Angular que celle utilisée par ce starter.

## Point de départ

Le projet contient déjà :

- le formulaire **Employee Entry Form** ;
- le modèle `Employee` ;
- le bouton **Employee List** ;
- le tableau d'affichage des employés ;
- un `EmployeeService` qui enregistre et lit les employés dans Cloud Firestore.

## Configuration Firestore

AngularFire 18 et Firebase sont déjà installés.

1. Créez un projet dans la console Firebase et ajoutez une application Web.
2. Copiez les valeurs de `firebaseConfig` dans `src/environments/environment.ts`, sous `firebase`.
3. Créez la base Firestore par défaut, en mode test pour le laboratoire comme indiqué dans l'énoncé. Ce mode donne un accès temporaire aux données : utilisez uniquement des employés fictifs.
4. Redémarrez `npm start` si nécessaire.

La collection `employees` est créée automatiquement au premier enregistrement. Le formulaire attend la confirmation de Firestore avant de vider les champs et d'ouvrir la liste. La liste écoute les changements de la collection et convertit les dates Firestore pour leur affichage dans Angular.

Pour vérifier : ajoutez un employé fictif, rechargez la page et ouvrez Employee List. L'employé doit rester visible et son document doit apparaître dans la console Firebase.

Sans configuration Firebase, l'interface reste accessible mais les opérations de sauvegarde et de lecture affichent une erreur. Aucun stockage en mémoire ne remplace silencieusement Firestore.

## Important

Utilisez votre propre configuration Firebase. Ne partagez pas les paramètres ou fichiers d'un autre projet Firebase.
