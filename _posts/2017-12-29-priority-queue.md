---
layout: post
title:  "우선순위 큐 (Priority Queue)"
date:   2017-12-29
categories: datastructures
---

# Priority Queue

```javascript
function PriorityQueue() {
    var items = [];

    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function(element, priority) {
        var queueElement = new QueueElement(element, priority);

        if (this.isEmpty()) {
            items.push(queueElement);
        } else {
            var added = false;

            for (var i = 0; i < items.length; i++) {
                if (queueElement.priority > items[i].priority) {
                    items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }

            if (!added) {
                items.push(queueElement);
            }
        }
    };

    this.dequeue = function() {
        return items.shift();
    };

    this.front = function() {
        return items[0];
    };

    this.isEmpty = function() {
        return items.length === 0;
    };

    this.size = function() {
        return items.length;
    };

    this.clear = function() {
        items = [];
    };

    this.print = function() {
        console.log(items.toString());
    };
}
```