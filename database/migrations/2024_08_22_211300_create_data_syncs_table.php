<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('data_syncs', function (Blueprint $table) {
            $table->id();
            $table->string('sync_method');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('data_syncs');
    }
};
