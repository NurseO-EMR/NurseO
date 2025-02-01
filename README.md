<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->


<!-- PROJECT LOGO -->
<br />
<div align="left">
<div align="center">
    <span
			style="font-size: 3.75rem; font-weight: 700;">
			<span style="letter-spacing: 0.05em;">Nurse<abbr title="Open Source">O</abbr>&nbsp;</span>
			<span class="text-red-700 "
      style="color: rgb(255 28 28);">
				EMR
			</span>
		</span>
</div>

  <h3 align="center">Very Simple Simulated EMR System designed for Nursing Education</h3>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![NurseO Home Screen][product-screenshot]

NurseO is a simple simulated EMR system designed for healthcare education with the ability to recreate the same patient multiple times from a single template. Each copy is unique to that student and saves the progress made by that specific student.

Benefits of NurseO
* Simple EMR focused on giving the students the information they need without trying to learn the complexity of real EMR system.
* Ability to reset after each student without having to make multiple copies of the same patient
* The ability to have multiple location with multiple stations and limit the patients to specific locations.
* Open source, you can modify it to exactly fit your needs.

Cons of using NurseO
* No official support: while I am happy to answer questions as time permits there is no offical support channel and in a way you are maintaining it internally.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
NurseO runs on a docker container, the included docker compose file has a the build for NurseO as well as a MariaDB and phpmyadmin setup. However, for production environments consult with your IT team for the best place to store the data and ensure data backups.

### Prerequisites
* Docker Server or Instance
* MariaDB LTS version 
* Some knowledge on using and managing docker containers as well as databases.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo

   ```sh
   git clone https://github.com/NurseO-EMR/NurseO.git
   ```

2. Navigate to the NurseO folder

    ```sh
      cd NurseO/
    ```

3. Copy the environment file

    ```sh
      cp .env.example .env
    ```

4. Edit your environment variables

    ```sh
      nano .env
    ```

5. Add Google Client Id and Secret

    ```env
      Google_CLIENT_ID="client id goes here"
    ```

    ```env
      Google_CLIENT_SECRET="client secret goes here"
    ```

6. Save & exit from Nano by pressing CTRL+O to save then CTRL+X to exit
7. Run docker compose

    ```sh
      docker compose up -d --build
    ```

8. Go to <machine_ip>:3000/nurseo/nurseo_admin


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage





<!-- ROADMAP -->
## Roadmap

* [ ] Add Changelog

See the [open issues](https://github.com/NurseO-EMR/NurseO/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/NurseO-EMR/NurseO/blob/master/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mohammed Alkhafaji - 

Project Link: [https://github.com/NurseO-EMR/NurseO](https://github.com/NurseO-EMR/NurseO)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* This software would not have been possible without the support of many of the faculty and staff from the Department of Nursing at Miami University
* The template for this readme is from https://github.com/othneildrew/Best-README-Template


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: docs/images/homescreen.png
