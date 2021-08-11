# Attributing

If you are using material licensed under [Creative Commons](https://creativecommons.org/) (a common license used by many artists), according to the terms of the license, you are required to give credit to the original author and indicate if changes were made. Note that **Creative Commons Zero (CC0, CC0 1.0)** does _not require_ attribution, but it is still a nice thing to do.

## Credits Journal Entry

It is recommended to create a Journal Entry called `Credits` at the root of the Journal Entries in the world you are working on. You could either list each attribution on its own line, categorize them by file type or logically into scenes, actors, etc.

### Example Journal Entry

Logically sorted:

```html
<h1>Scenes</h1>
<h2>Scene 1</h2>
<p>Credit 1</p>
<p>Credit 2</p>
<h1>Actors</h1>
<h2>Actor 1</h2>
<p>Credit 1</p>
<p>Credit 2</p>
<h1>Items</h1>
<h2>Item 1</h2>
<p>Credit 1</p>
<p>Credit 2</p>
<h1>Journal Entries</h1>
<h2>Journal Entry 1</h2>
<p>Credit 1</p>
<p>Credit 2</p>
<h1>Playlists</h1>
<h2>Playlist 1</h2>
<p>Credit 1</p>
<p>Credit 2</p>
```

Sorted by file type:

```html
<h1>Image Files</h1>
<p>Credit 1</p>
<p>Credit 2</p>
<h1>Audio Files</h1>
<p>Credit 1</p>
<p>Credit 2</p>
```

## Attribution Structure

Let us examine an example attribution:

> **celebration_grayscale.webp**: "[Creative Commons 10th Birthday Celebration San Francisco](https://www.flickr.com/photos/sixteenmilesofstring/8256206923/in/set-72157632200936657)" by [tvol](https://www.flickr.com/photos/sixteenmilesofstring/) is licensed under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). / Desaturated, levels adjusted.

A good source attribution answers the following questions:

| Question     | Answer                                                                                                                                             | Description                                                                                                                                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File?**    | celebration_grayscale.webp                                                                                                                         | What file is this source attribution for? In larger projects containing many files with the same name, you could also use the relative path to the file from the project root directory.                                                                 |
| **Title?**   | [Creative Commons 10th Birthday Celebration San Francisco](https://www.flickr.com/photos/sixteenmilesofstring/8256206923/in/set-72157632200936657) | The original title of the work (**optionally**) linked to the source website. If a title is not provided, don't add one.                                                                                                                                 |
| **Author?**  | [tvol](https://www.flickr.com/photos/sixteenmilesofstring/)                                                                                        | Name of the author—written how the author wishes to be attributed, which may not be their real name—(**optionally**) linked to the author's-website. In rare cases, the author may not want to be attributed at all. In this case, don't add the author. |
| **License?** | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)                                                                                          | **Optional:** License abbreviation linked to license deed. Only add this if you _know_ what the license of the source work is.                                                                                                                           |
| **Changes?** | Desaturated, levels adjusted.                                                                                                                      | **Optional:** A _brief_ description of how the original work has been changed. Only add this if you have made _changes_ to the file.                                                                                                                     |

### File Format Conversions

Technically converting an image or an audio file to another format (e.g., a PNG image to WebP, or MP3 audio to Ogg) could be considered changing the source file because if doing a bit-for-bit comparison, the files will not be identical. However, in our use case changing the file format is very commonly done and the change is minor, so it shouldn't be too bad to omit the change notice for file format conversions to make the source attributions shorter and easier to read.

### Example Attributions

The Markdown formatting can be used in git repositories. The HTML formatting is provided for use in Foundry VTT journals.

#### Common Use Case

With no changes made to the file and a single author.

> **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author](author's-website) is licensed under [License Abbreviation](link-to-license-deed).

```md
Markdown: **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author](author's-website) is licensed under [License Abbreviation](link-to-license-deed).
HTML: <p><strong>File Name</strong>: "<a href="link-to-source-website-or-file">Source Page Title or File Name</a>" by <a href="author's-website">Author</a> is licensed under <a href="link-to-license-deed">License Abbreviation</a>.</p>
```

#### Unknown License

If the source material license is unknown, but you still want to credit the author.

> **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author](author's-website).

```md
Markdown: **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author](author's-website).
HTML: <p><strong>File Name</strong>: "<a href="link-to-source-website-or-file">Source Page Title or File Name</a>".</p>
```

#### Multiple Authors

In the case of multiple authors, separate them by commas.

> **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author 1](author-1's-website), [Author 2](author-2's-website) is licensed under [License Abbreviation](link-to-license-deed).

```md
Markdown: **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author 1](author-1's-website), [Author 2](author-2's-website) is licensed under [License Abbreviation](link-to-license-deed).
HTML: <p><strong>File Name</strong>: "<a href="link-to-source-website-or-file">Source Page Title or File Name</a>" by <a href="author 1's website">Author 1</a>, <a href="author 2's website">Author 2</a> is licensed under <a href="link-to-license-deed">License Abbreviation</a>.</p>
```

#### With Changes

If you have made changes to the file, note them at the end of the line, separated with a forward slash (**/**).

> **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author](author's-website) is licensed under [License Abbreviation](link-to-license-deed). / Briefly describe changes you've made.

```md
Markdown: **File Name**: "[Source Page Title or File Name](link-to-source-website-or-file)" by [Author](author's-website) is licensed under [License Abbreviation](link-to-license-deed). / Briefly describe changes you've made.
HTML: <p><strong>File Name</strong>: "<a href="link-to-source-website-or-file">Source Page Title or File Name</a>" by <a href="author's-website">Author</a> is licensed under <a href="link-to-license-deed">License Abbreviation</a>. / Briefly describe changes you've made.</p>
```

## Table of Creative Commons Licenses

This table is provided for quick reference purposes. For an up to date list of Creative Commons licenses see: [https://creativecommons.org/licenses/](https://creativecommons.org/licenses/)

The table only lists the newer 3.0 and 4.0 versions of the licenses. For all versions, see the [License Versions](https://wiki.creativecommons.org/wiki/License_Versions#Licenses) article on the Creative Commons wiki or simply change the version number in the URL. (E.g., `https://creativecommons.org/licenses/by/4.0/` to `https://creativecommons.org/licenses/by/2.0/`.)

If the content you are attributing does not specify the version of the Creative Commons license (e.g., "licensed under CC-BY"), you can assume it refers to the newest version of the license (**4.0** at the time of writing of this article).

| Title                                                     | Abbr.           | Link                                                       |
| :-------------------------------------------------------- | :-------------- | :--------------------------------------------------------- |
| Attribution 4.0 International                             | CC BY 4.0       | [Deed](https://creativecommons.org/licenses/by/4.0/)       |
| Attribution-ShareAlike 4.0 International                  | CC BY-SA 4.0    | [Deed](https://creativecommons.org/licenses/by-sa/4.0/)    |
| Attribution-NoDerivatives 4.0 International               | CC BY-ND 4.0    | [Deed](https://creativecommons.org/licenses/by-nd/4.0/)    |
| Attribution-NonCommercial 4.0 International               | CC BY-NC 4.0    | [Deed](https://creativecommons.org/licenses/by-nc/4.0/)    |
| Attribution-NonCommercial-ShareAlike 4.0 International    | CC BY-NC-SA 4.0 | [Deed](https://creativecommons.org/licenses/by-nc-sa/4.0/) |
| Attribution-NonCommercial-NoDerivatives 4.0 International | CC BY-NC-ND 4.0 | [Deed](https://creativecommons.org/licenses/by-nc-nd/4.0/) |
| Attribution 3.0 Unported                                  | CC BY 3.0       | [Deed](https://creativecommons.org/licenses/by/3.0/)       |
| Attribution-ShareAlike 3.0 Unported                       | CC BY-SA 3.0    | [Deed](https://creativecommons.org/licenses/by-sa/3.0/)    |
| Attribution-NoDerivs 3.0 Unported                         | CC BY-ND 3.0    | [Deed](https://creativecommons.org/licenses/by-nd/3.0/)    |
| Attribution-NonCommercial 3.0 Unported                    | CC BY-NC 3.0    | [Deed](https://creativecommons.org/licenses/by-nc/3.0/)    |
| Attribution-NonCommercial-ShareAlike 3.0 Unported         | CC BY-NC-SA 3.0 | [Deed](https://creativecommons.org/licenses/by-nc-sa/3.0/) |
| Attribution-NonCommercial-NoDerivs 3.0 Unported           | CC BY-NC-ND 3.0 | [Deed](https://creativecommons.org/licenses/by-nc-nd/3.0/) |
| CC0 1.0 Universal                                         | CC0 1.0         | [Deed](https://creativecommons.org/publicdomain/zero/1.0/) |

For further clarifications about the licenses, see the [License Versions](https://wiki.creativecommons.org/wiki/License_Versions) article on the Creative Commons wiki.

---

Portions of this guide are loosely based on the "[Best practices for attribution](https://wiki.creativecommons.org/wiki/Best_practices_for_attribution)" article on the Creative Commons wiki, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
