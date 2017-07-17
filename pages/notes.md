---
layout: default
---

# Notes


<table class="table table-striped">

{% for post in site.posts %}

		<tr class="clickable-row" data-href="{{ post.url }}">
			<td>{{ post.title }}</td>
			<td>{{ post.date | date_to_string}}</td>
		</tr>

{% endfor %}	

</table>

