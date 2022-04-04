# Journal Entries

## From Google Docs

Copy-paste the content in normally and then immediately use TinyMCE's "Clear formatting" button. Re-apply important styling such as bold text and then run the Regex below.

Make sure that you also remove any unwanted non-breaking spaces (`&nbsp;`) and single right quotation marks (`'`) being used instead of apostrophes.

Install the [World Smiths Toolkit module](https://foundryvtt.com/packages/wst) and use it to add colorful blocks where appropriate.
Use the `highlights` block for something you want to bring focus to.

## Regex

### Cleanup

Remove unwanted HTML attributes:

```txt
/( aria-level="1"| dir="ltr"| role="presentation"|&nbsp;|<span style="([^"]*)">|<\/span>)/gm
```

### Quotes

Replace tables with blockquotes:

```txt
<div align="left">
<table><colgroup><col \/><\/colgroup>
<tbody>
<tr>
<td>
<p>(?'contents'.*)<\/p>
<\/td>
<\/tr>
<\/tbody>
<\/table>
<\/div>
replace:
```

```txt
<blockquote><p>$contents</p></blockquote>
```

### Fixed Table

Remove fixed table widths and heights:

```txt
<t(?'a'\w) style="(height|width): \d{1,2}px;">
```

```txt
<t$a>
```
